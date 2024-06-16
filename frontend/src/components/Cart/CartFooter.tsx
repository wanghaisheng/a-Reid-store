import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { closeDrawer } from '../../app/features/drawerSlice';
import Button from '../AsideDrawer/Button';
import { useCartInfo } from '../../hooks/useCartInfo';
import { useCheckout } from '../../hooks/useCheckout';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useTranslation } from 'react-i18next';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';

const CartFooter = () => {
  const dispatch = useAppDispatch();
  const { loadingCartProducts, errorCartProducts, cartProducts } = useAsideDrawer();
  const { total } = useCartInfo(cartProducts, 'cart');
  const { handleCheckout } = useCheckout(cartProducts);
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('cartProducts');
  const { t } = useTranslation();

  if (loadingCartProducts) return false;
  if (errorCartProducts) return <p>Error : {errorCartProducts.message}</p>;

  const CartFooter = () => (
    <div className='cartFooter'>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '2rem' }}>
        {t('Total')}: ${total.toFixed(2)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Link to='shopping-cart'>
          <Button onClick={() => dispatch(closeDrawer())}>{t('VIEW_CART')}</Button>
        </Link>
        <Button
          onClick={() => {
            handleCheckout();
            dispatch(closeDrawer());
          }}
        >
          {t('CHECKOUT')}
        </Button>
      </Box>
    </div>
  );

  return (
    <>
      {(activeUser && cartProducts.length > 0 && <CartFooter />) ||
        (!activeUser && getLatestStoredValue('cartProducts').data.length > 0 && <CartFooter />)}
    </>
  );
};

export default CartFooter;
