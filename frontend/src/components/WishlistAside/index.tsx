import AsideDrawer from '../AsideDrawer';
import Header from '../AsideDrawer/Header';
import Body from '../AsideDrawer/Body';
import Footer from '../AsideDrawer/Footer';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '../AsideDrawer/Button';
import { closeDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch } from '../../app/store';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { ProductEntity } from '../../gql/graphql';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const WishlistAside = () => {
  const {
    loadingWishlistProducts,
    errorWishlistProducts,
    wishlistProducts,
    handleWishlist,
    handleCart,
  } = useAsideDrawer();
  const dispatch = useAppDispatch();
  const { activeUser } = useAuth();
  const { getLatestStoredValue, removeSessionProduct } = useSessionStorage('wishlistProducts');
  const { setValue } = useSessionStorage('cartProducts');
  const { t } = useTranslation();

  const handleRemoveProduct = (product: ProductEntity) => {
    if (activeUser) handleWishlist(false, product);
    else removeSessionProduct(product, 'wishlistProducts');
  };

  const handleOrder = async () => {
    dispatch(closeDrawer());
    if (activeUser) {
      for (const product of wishlistProducts) {
        const createCartProduct = {
          data: {
            users_permissions_user: activeUser?.user.id,
            productId: product.id,
            name: product.attributes?.name,
            size: 'S',
            color: 'Red',
            cartCounter: 1,
            img: product.attributes?.img,
            price: product.attributes?.price,
          },
        };
        await handleCart('CREATE', createCartProduct);
        await handleWishlist(false, product);
      }
    } else {
      getLatestStoredValue('wishlistProducts').data.forEach((product: ProductEntity) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setValue(product);
      });
    }
  };

  if (loadingWishlistProducts) return false;
  if (errorWishlistProducts) return false;

  const OrderButton = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
      <Link to='shopping-cart'>
        <Button onClick={handleOrder}>{t('ORDER_NOW')}</Button>
      </Link>
    </Box>
  );

  return (
    <AsideDrawer>
      <Header title={t('YOUR_WISHLIST')} />
      <Body
        name={t('wishlist')}
        products={activeUser ? wishlistProducts : getLatestStoredValue('wishlistProducts').data}
        handleRemoveProduct={handleRemoveProduct}
        cartIcon={true}
      />
      <Footer>
        {activeUser && wishlistProducts.length > 0 && <OrderButton />}
        {!activeUser && getLatestStoredValue('wishlistProducts').data.length > 0 && <OrderButton />}
      </Footer>
    </AsideDrawer>
  );
};

export default WishlistAside;
