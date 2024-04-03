import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import PageContainer from '../../components/PageContainer';
import { PageWrapper } from '../ShoppingCart';
import Empty from '../../components/AsideDrawer/Empty';
import { useEffect } from 'react';
import { useAppSelector } from '../../app/store';
import Toast from '../../components/Toasts/Toast';
import CartTable from '../ShoppingCart/CartTable';
import CartTotals from '../ShoppingCart/CartTotals';

const Wishlist = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isLiked: true, isAddedToCart: false },
  });
  const { wishlistCounter } = useAppSelector((store) => store.drawer);

  useEffect(() => {
    refetch();
  }, [data, refetch, wishlistCounter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <PageContainer style={{ paddingTop: '4rem' }}>
      <PageWrapper>
        {!data.products.data.length ? (
          <Empty name='wishlist' />
        ) : (
          <>
            <CartTable products={data.products.data} target='wishlist' />
            {<CartTotals data={data} target='wishlist' />}
          </>
        )}
        <Toast />
      </PageWrapper>
    </PageContainer>
  );
};

export default Wishlist;
