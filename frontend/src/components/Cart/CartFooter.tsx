import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { closeDrawer } from '../../app/features/drawerSlice';
import Button from '../AsideDrawer/Button';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { useCartInfo } from '../../hooks/useCartInfo';
import { useCheckout } from '../../hooks/useCheckout';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useTranslation } from 'react-i18next';

const CartFooter = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { isAddedToCart: true, isLiked: false },
  });
  const { total } = useCartInfo(data, 'cart');
  const { handleCheckout } = useCheckout(data);
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('cartProducts');
  const { t } = useTranslation();

  if (loading) return false;
  if (error) return <p>Error : {error.message}</p>;

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
      {(activeUser && data.products.data.length > 0 && <CartFooter />) ||
        (!activeUser && getLatestStoredValue('cartProducts').data.length > 0 && <CartFooter />)}
    </>
  );
};

export default CartFooter;
