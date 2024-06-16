import { Box, Paper, Typography, styled } from '@mui/material';
import Button from '../../components/AsideDrawer/Button';
import { ProductEntity } from '../../gql/graphql';
import { useCheckout } from '../../hooks/useCheckout';
import { useCartInfo } from '../../hooks/useCartInfo';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../contexts/locale/LocaleContext';

export const StyledCartTotals = styled(Paper)({
  padding: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',

  '& .totalRow': {
    width: '230px',
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': { fontSize: '2rem' },
  },
});

type CartTotalsProps = {
  data: {
    products: { data: ProductEntity[] };
  };
  target: string;
};

const CartTotals = ({ data, target }: CartTotalsProps) => {
  const { handleCheckout, loadingPayment } = useCheckout(data);
  const { total } = useCartInfo(data, target);
  const { wishlistProducts, handleCart, handleWishlist } = useAsideDrawer();
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('wishlistProducts');
  const { setValue } = useSessionStorage('cartProducts');
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  const handleOrder = async () => {
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
        setValue(product);
      });
    }
  };

  return (
    <div className='totals'>
      <Typography
        variant='h4'
        sx={{
          color: 'white',
          marginBottom: '2rem',
          textAlign: lang == 'ar' ? 'right' : 'auto',
        }}
      >
        {target == 'cart' ? t('CartTotals') : t('Totals')}
      </Typography>
      <StyledCartTotals>
        <div className='totalRow' style={{ flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }}>
          <Typography variant='h4'>{t('Subtotal')}:</Typography>
          <Typography variant='h5'>${total.toFixed(2)}</Typography>
        </div>
        <div className='totalRow' style={{ flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }}>
          <Typography variant='h4'>{t('Shipping')}:</Typography>
          <Typography variant='h5'>$10.00</Typography>
        </div>
        <div className='totalRow' style={{ flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }}>
          <Typography variant='h4'>{t('Total')}:</Typography>
          <Typography variant='h5'>${(total + 10.0).toFixed(2)}</Typography>
        </div>
        <Box sx={{ textAlign: 'center', width: '230px' }}>
          {target == 'cart' ? (
            <Button onClick={handleCheckout}>
              {loadingPayment ? t('LOADING') : t('PROCEED_TO_CHECKOUT')}
            </Button>
          ) : (
            <Link to={`${window.origin}/shopping-cart`}>
              <Button onClick={handleOrder}>{t('ORDER_NOW')}</Button>
            </Link>
          )}
        </Box>
      </StyledCartTotals>
    </div>
  );
};

export default CartTotals;
