import { useEffect, useState } from 'react';
import { ProductEntity } from '../gql/graphql';
import useAuth from './useAuth';
import { useSessionStorage } from './useSessionStorage';

type dataType = {
  products: { data: ProductEntity[] };
};

export const useCartInfo = (data: dataType, target: string) => {
  const [total, setTotal] = useState(0);
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('cartProducts');

  useEffect(() => {
    let products;
    if (activeUser && data) products = data;
    if (!activeUser)
      products = getLatestStoredValue(
        `${target == 'cart' ? 'cartProducts' : 'wishlistProducts'}`
      ).data;

    const tot = products?.reduce(
      (total: number, product: ProductEntity) =>
        total +
        (target == 'cart'
          ? product.attributes!.cartCounter! * product.attributes!.price!
          : product.attributes!.price!),
      0
    );
    setTotal(tot);
  }, [data, activeUser, getLatestStoredValue, target]);

  return { total };
};
