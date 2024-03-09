import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORY, PAGINATION, UPDATE_PRODUCT } from './queries';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setProductsQuery } from '../../app/features/productsSlice';
import { useEffect } from 'react';
import { Maybe } from '../../gql/graphql';
import { openToast } from '../../app/features/toastSlice';

export const useProductsQuery = () => {
  const PAGE_SIZE = 16;
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector((store) => store.products);

  const {
    loading,
    error,
    data,
    refetch: getCategoryProducts,
  } = useQuery(GET_CATEGORY, {
    variables: { id: categoryId ? categoryId : '1', limit: PAGE_SIZE },
  });

  const {
    loading: loadingPagination,
    error: errorPagination,
    data: dataPagination,
    refetch: refetchPagination,
  } = useQuery(PAGINATION, {
    variables: { categoryId: categoryId ? categoryId : '1', limit: PAGE_SIZE },
  });

  useEffect(() => {
    if (loading) dispatch(setProductsQuery({ loading, error: undefined, products: [] }));
    if (error) dispatch(setProductsQuery({ loading: false, error, products: [] }));
    if (data) {
      if (loadingPagination) return;
      if (errorPagination) return;
      if (dataPagination) {
        dispatch(
          setProductsQuery({
            loading: false,
            error: undefined,
            products: data.category.data.attributes.products.data,
            categoryId: data.category.data.id,
            pagination: dataPagination.products.meta.pagination,
          })
        );
      }
    }
  }, [dispatch, loading, error, data, loadingPagination, errorPagination, dataPagination]);

  return { getCategoryProducts, refetchPagination, PAGE_SIZE };
};

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const [updateWishlist] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => handleToastMessage(data),
  });

  type dataType = {
    updateProduct: { data: { attributes: { name: string; isLiked: boolean } } };
  };

  const handleToastMessage = (data: dataType) => {
    const dataExists = data.updateProduct.data;
    const isLiked = dataExists?.attributes.isLiked;
    const productName = dataExists?.attributes.name;
    if (dataExists && isLiked) {
      dispatch(
        openToast({
          type: 'success',
          message: `${productName} is added to wishlist!`,
        })
      );
    }
    if (dataExists && !isLiked) {
      dispatch(
        openToast({
          type: 'success',
          iconName: 'HighlightOffOutlinedIcon',
          message: `${productName} is removed from wishlist!`,
        })
      );
    }
    if (!dataExists) {
      dispatch(
        openToast({ type: 'error', message: 'Product does not exist, or some error happens!' })
      );
    }
  };

  const handleWishlistProduct = (id: Maybe<string> | undefined, isLiked: boolean) => {
    updateWishlist({ variables: { id, isLiked } });
  };

  return { handleWishlistProduct };
};
