import PageContainer from '../../components/PageContainer';
import { PageWrapper } from '../ShoppingCart';
import Empty from '../../components/AsideDrawer/Empty';
import Toast from '../../components/Toasts/Toast';
import CartTable from '../ShoppingCart/CartTable';
import CartTotals from '../ShoppingCart/CartTotals';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Spinner } from '../../components/Spinners';
import { useTranslation } from 'react-i18next';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';

const Wishlist = () => {
  const { activeUser } = useAuth();
  const { loadingWishlistProducts, errorWishlistProducts, wishlistProducts } = useAsideDrawer();
  const { getLatestStoredValue } = useSessionStorage('wishlistProducts');
  const { t } = useTranslation();

  if (loadingWishlistProducts) return <Spinner />;
  if (errorWishlistProducts) return false;

  return (
    <PageContainer style={{ paddingTop: '4rem' }}>
      <PageWrapper>
        {(activeUser && !wishlistProducts.length) ||
        (!activeUser && !getLatestStoredValue('wishlistProducts').data.length) ? (
          <Empty name={t('wishlist')} />
        ) : (
          <>
            <CartTable
              products={
                activeUser ? wishlistProducts : getLatestStoredValue('wishlistProducts').data
              }
              target='wishlist'
            />
            <CartTotals data={wishlistProducts} target='wishlist' />
          </>
        )}
        <Toast />
      </PageWrapper>
    </PageContainer>
  );
};

export default Wishlist;
