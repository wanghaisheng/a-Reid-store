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
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Spinner } from '../../components/Spinners';

const Wishlist = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isLiked: true, isAddedToCart: false },
  });
  const { wishlistCounter } = useAppSelector((store) => store.drawer);
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('wishlistProducts');

  useEffect(() => {
    refetch();
  }, [data, refetch, wishlistCounter]);

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <PageContainer style={{ paddingTop: '4rem' }}>
      <PageWrapper>
        {(activeUser && !data.products.data.length) ||
        (!activeUser && !getLatestStoredValue('wishlistProducts').data.length) ? (
          <Empty name='wishlist' />
        ) : (
          <>
            <CartTable
              products={
                activeUser ? data.products.data : getLatestStoredValue('wishlistProducts').data
              }
              target='wishlist'
            />
            <CartTotals data={data} target='wishlist' />
          </>
        )}
        <Toast />
      </PageWrapper>
    </PageContainer>
  );
};

export default Wishlist;
