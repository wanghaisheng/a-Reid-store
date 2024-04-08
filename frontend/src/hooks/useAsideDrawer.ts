import { useMutation, useQuery } from '@apollo/client';
import { useAppDispatch } from '../app/store';
import { PRODUCTS_ITEMS_COUNT, UPDATE_PRODUCT } from '../graphql/queries';
import { openToast } from '../app/features/toastSlice';
import { Maybe } from '../gql/graphql';

export const useAsideDrawer = () => {
  const dispatch = useAppDispatch();
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => handleToastMessage(data),
  });

  const { data: wishlistCounter, refetch: getWishlistCounter } = useQuery(PRODUCTS_ITEMS_COUNT, {
    variables: { isLiked: { eq: true } },
  });

  const { data: cartCounter, refetch: getCartCounter } = useQuery(PRODUCTS_ITEMS_COUNT, {
    variables: { isAddedToCart: { eq: true } },
  });

  type dataType = {
    updateProduct: {
      data: {
        attributes: { name: string; isLiked: boolean; isAddedToCart: boolean; target: string };
      };
    };
  };

  const handleToastMessage = (data: dataType) => {
    const dataExists = data.updateProduct.data;
    const target = dataExists?.attributes.target;
    const isLiked = dataExists?.attributes.isLiked;
    const isAddedToCart = dataExists?.attributes.isAddedToCart;
    const productName = dataExists?.attributes.name;

    if (dataExists) {
      let message = '';
      if (target == 'wishlist')
        message = `${productName} is ${isLiked ? 'added to' : 'removed from'} ${target}!`;
      if (target == 'cart')
        message = `${productName} is ${isAddedToCart ? 'added to' : 'removed from'} ${target}!`;

      dispatch(
        openToast({
          type: 'success',
          iconName: !isLiked && !isAddedToCart ? 'HighlightOffOutlinedIcon' : undefined,
          message,
        })
      );
    }

    if (!dataExists) {
      dispatch(
        openToast({ type: 'error', message: 'Product does not exist, or some error happens!' })
      );
    }

    getCartCounter();
    getWishlistCounter();
  };

  const handleProduct = (
    id: Maybe<string> | undefined,
    isLiked?: boolean,
    isAddedToCart?: boolean,
    size?: string,
    color?: string,
    cartCounter?: number,
    target?: string
  ) => {
    updateProduct({ variables: { id, isLiked, isAddedToCart, size, color, cartCounter, target } });
  };

  return { handleProduct, wishlistCounter, cartCounter };
};
