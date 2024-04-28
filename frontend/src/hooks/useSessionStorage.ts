import { ProductEntity } from '../gql/graphql';
import { useAppDispatch } from '../app/store';
import { openToast } from '../app/features/toastSlice';
import { useCallback, useEffect } from 'react';
import { setSessionCounters, fireTrigger } from '../app/features/drawerSlice';

export const useSessionStorage = (key: string, initialValue = { data: [] }) => {
  const dispatch = useAppDispatch();

  const getLatestStoredValue = useCallback(
    (key: string) => {
      const item = window.sessionStorage.getItem(key);
      if (item) return JSON.parse(item);
      else return initialValue;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [initialValue]
  );

  useEffect(() => {
    dispatch(setSessionCounters({ key, products: getLatestStoredValue(key) }));
  }, [getLatestStoredValue, dispatch, key]);

  const setValue = (sessionProduct: ProductEntity) => {
    const valueToStore = getLatestStoredValue(key);
    try {
      const index = valueToStore.data?.findIndex((e: ProductEntity) => e.id == sessionProduct.id);

      if (index === -1) {
        const product = {
          __typename: 'ProductEntity',
          id: sessionProduct.id,
          attributes: {
            ...sessionProduct.attributes,
            isLiked: key == 'wishlistProducts' ? true : false,
            isAddedToCart: key == 'cartProducts' ? true : false,
          },
        };
        valueToStore.data.push(product);
        // in case of adding an element to the cart, remove it from the wishlist
        if (key == 'cartProducts') {
          const valueToDelete = getLatestStoredValue('wishlistProducts');
          const index = valueToDelete.data.findIndex(
            (e: ProductEntity) => e.id == sessionProduct.id
          );
          if (index != -1) {
            valueToDelete.data?.splice(index, 1);
            window.sessionStorage.setItem('wishlistProducts', JSON.stringify(valueToDelete));
          }
        }
        //
        dispatch(
          openToast({
            type: 'success',
            iconName: undefined,
            message: `${sessionProduct.attributes?.name} is added to ${
              key == 'wishlistProducts' ? 'wishlist' : 'cart'
            }!`,
          })
        );
      } else {
        // in case of updating the cart
        if (key == 'cartProducts') {
          valueToStore.data[index] = sessionProduct;
          dispatch(
            openToast({
              type: 'success',
              iconName: undefined,
              message: `${sessionProduct.attributes?.name} is added to cart!`,
            })
          );
        } else {
          valueToStore.data?.splice(index, 1);
          dispatch(
            openToast({
              type: 'success',
              iconName: 'HighlightOffOutlinedIcon',
              message: `${sessionProduct.attributes?.name} is removed from ${
                key == 'wishlistProducts' ? 'wishlist' : 'cart'
              }!`,
            })
          );
        }
        //
      }

      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      dispatch(setSessionCounters({ key, products: valueToStore }));
    } catch (error) {
      console.log(error);
    }
  };

  const setProductCounter = (sessionProduct: ProductEntity, key: string) => {
    const valueToStore = getLatestStoredValue(key);
    const index = valueToStore.data.findIndex((e: ProductEntity) => e.id == sessionProduct.id);
    valueToStore.data[index] = sessionProduct;
    window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    dispatch(fireTrigger());
  };

  const removeSessionProduct = (sessionProduct: ProductEntity, key: string) => {
    const valueToDelete = getLatestStoredValue(key);
    const index = valueToDelete.data.findIndex((e: ProductEntity) => e.id == sessionProduct.id);
    valueToDelete.data.splice(index, 1);
    window.sessionStorage.setItem(key, JSON.stringify(valueToDelete));
    dispatch(fireTrigger());
  };

  return { getLatestStoredValue, setValue, setProductCounter, removeSessionProduct };
};
