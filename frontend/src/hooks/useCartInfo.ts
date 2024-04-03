import { useEffect, useState } from 'react';
import { ProductEntity } from '../gql/graphql';

type dataType = {
  products: { data: ProductEntity[] };
};

export const useCartInfo = (data: dataType) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data) {
      const tot = data.products.data.reduce(
        (total: number, product: ProductEntity) =>
          total + product.attributes!.cartCounter! * product.attributes!.price!,
        0
      );
      setTotal(tot);
    }
  }, [data]);

  return { total };
};
