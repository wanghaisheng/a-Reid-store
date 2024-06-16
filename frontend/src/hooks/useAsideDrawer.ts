import { OperationVariables, useMutation, useQuery } from '@apollo/client';
import { useAppDispatch } from '../app/store';
import {
  GET_USER_WISHLIST,
  UPDATE_USER_WISHLIST,
  GET_USER_CART,
  UPDATE_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  CREATE_CART_PRODUCT,
  CREATE_USER_WISHLIST,
  CREATE_USER_CART,
} from '../graphql/queries';
import { openToast } from '../app/features/toastSlice';
import { ProductEntity } from '../gql/graphql';
import useAuth from './useAuth';
import { useTranslation } from 'react-i18next';
import { setDrawerCounters } from '../app/features/drawerSlice';

export const useAsideDrawer = () => {
  const dispatch = useAppDispatch();
  const { activeUser } = useAuth();
  const { t } = useTranslation();

  const {
    loading: wishlistProductsLoading,
    error: wishlistProductsError,
    data: dataWishlistProducts,
    refetch: refreshWishlistProducts,
  } = useQuery(GET_USER_WISHLIST, {
    variables: {
      userId: { eq: activeUser?.user.id },
    },
    context: {
      headers: {
        Authorization: `Bearer ${activeUser?.jwt}`,
      },
    },
  });

  let loadingWishlistProducts;
  let errorWishlistProducts;
  if (activeUser) {
    loadingWishlistProducts = wishlistProductsLoading;
    errorWishlistProducts = wishlistProductsError;
  } else {
    loadingWishlistProducts = false;
    errorWishlistProducts = false;
  }
  const wishlistProducts = dataWishlistProducts?.wishlists.data[0]?.attributes.products.data;
  const numOfWishlists = dataWishlistProducts?.wishlists.data.length;
  const wishlistCounter = wishlistProducts?.length;

  const [createWishlist] = useMutation(CREATE_USER_WISHLIST, {
    variables: {
      data: {
        users_permissions_user: activeUser?.user.id,
        products: [],
      },
    },
    context: {
      headers: {
        Authorization: `Bearer ${activeUser?.jwt}`,
      },
    },
  });

  const {
    loading: cartProductsLoading,
    error: cartProductsError,
    data: dataCartProducts,
    refetch: refreshCartProducts,
  } = useQuery(GET_USER_CART, {
    variables: {
      userId: { eq: activeUser?.user.id },
    },
    context: {
      headers: {
        Authorization: `Bearer ${activeUser?.jwt}`,
      },
    },
  });

  let loadingCartProducts;
  let errorCartProducts;
  if (activeUser) {
    loadingCartProducts = cartProductsLoading;
    errorCartProducts = cartProductsError;
  } else {
    loadingCartProducts = false;
    errorCartProducts = false;
  }
  const cartProducts = dataCartProducts?.carts.data[0]?.attributes.cart_products.data;
  const numOfCarts = dataCartProducts?.carts.data.length;
  const cartCounter = cartProducts?.length;

  const [createCart] = useMutation(CREATE_USER_CART, {
    variables: {
      data: {
        users_permissions_user: activeUser?.user.id,
        cart_products: [],
      },
    },
    context: {
      headers: {
        Authorization: `Bearer ${activeUser?.jwt}`,
      },
    },
  });

  const [updateWishlist] = useMutation(UPDATE_USER_WISHLIST);
  const [createCartProduct] = useMutation(CREATE_CART_PRODUCT);
  const [updateCartProduct] = useMutation(UPDATE_CART_PRODUCT);
  const [deleteCartProduct] = useMutation(DELETE_CART_PRODUCT);

  const handleWishlistMessage = (isLiked: boolean, productName: string | undefined) => {
    dispatch(
      openToast({
        type: 'success',
        message: `${productName} ${t('Is')} ${isLiked ? t('AddedTo') : t('RemovedFrom')}
        ${t('wishlist')}!`,
      })
    );
  };

  const handleCartMessage = (action: string, productName: string | undefined) => {
    let message;
    if (action === 'CREATE') {
      message = `${productName} ${t('Is')} ${t('AddedTo')} ${t('cart')}!`;
    }
    if (action === 'UPDATE') {
      message = `${productName} ${t('Is')} ${t('Updated')}!`;
    }
    if (action === 'DELETE') {
      message = `${productName} ${t('Is')} ${t('RemovedFrom')} ${t('cart')}!`;
    }
    dispatch(
      openToast({
        type: 'success',
        message,
      })
    );
  };

  const handleWishlist = async (isLiked: boolean, product: ProductEntity) => {
    const data = await refreshWishlistProducts();
    const wishlistId = data.data.wishlists.data[0].id;
    const wishlistProductsIds = data.data.wishlists.data[0].attributes.products.data.map(
      (p: ProductEntity) => p.id
    );
    let response;

    if (isLiked) {
      // add to wishlist
      wishlistProductsIds?.push(product.id);
      response = await updateWishlist({
        variables: {
          id: wishlistId,
          data: {
            users_permissions_user: activeUser?.user.id,
            products: wishlistProductsIds,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${activeUser?.jwt}`,
          },
        },
        onCompleted: () => handleWishlistMessage(isLiked, product.attributes?.name),
      });
    }
    if (!isLiked) {
      // remove from wishlist
      response = await updateWishlist({
        variables: {
          id: wishlistId,
          data: {
            users_permissions_user: activeUser?.user.id,
            products: wishlistProductsIds.filter((id: string) => id !== product.id),
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${activeUser?.jwt}`,
          },
        },
        onCompleted: () => handleWishlistMessage(isLiked, product.attributes?.name),
      });
    }
    dispatch(
      setDrawerCounters({
        target: 'wishlist',
        counter: response?.data.updateWishlist.data.attributes.products.data.length,
      })
    );
  };

  const handleCart = async (action: string, variables: OperationVariables) => {
    if (action === 'CREATE') {
      const data = await refreshCartProducts();
      const cartId = data.data.carts.data[0]?.id;
      variables.data.cart = cartId;
      await createCartProduct({
        variables,
        context: {
          headers: {
            Authorization: `Bearer ${activeUser?.jwt}`,
          },
        },
        onCompleted: () => handleCartMessage(action, variables.data.name),
      });
    }
    if (action === 'UPDATE') {
      await updateCartProduct({
        variables,
        context: {
          headers: {
            Authorization: `Bearer ${activeUser?.jwt}`,
          },
        },
        onCompleted: () => handleCartMessage(action, variables.data.name),
      });
    }
    if (action === 'DELETE') {
      await deleteCartProduct({
        variables: { id: variables.id },
        context: {
          headers: {
            Authorization: `Bearer ${activeUser?.jwt}`,
          },
        },
        onCompleted: () => handleCartMessage(action, variables.name),
      });
    }
    const response = await refreshCartProducts();
    dispatch(
      setDrawerCounters({
        target: 'cart',
        counter: response.data.carts.data[0].attributes.cart_products.data.length,
      })
    );
  };

  return {
    wishlistCounter,
    cartCounter,
    loadingWishlistProducts,
    errorWishlistProducts,
    wishlistProducts,
    refreshWishlistProducts,
    handleWishlist,
    numOfWishlists,
    createWishlist,
    loadingCartProducts,
    errorCartProducts,
    cartProducts,
    refreshCartProducts,
    handleCart,
    numOfCarts,
    createCart,
  };
};
