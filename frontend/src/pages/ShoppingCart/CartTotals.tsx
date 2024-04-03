import { Box, Paper, Typography, styled } from '@mui/material';
import Button from '../../components/AsideDrawer/Button';
import { ProductEntity } from '../../gql/graphql';
import { useCheckout } from '../../hooks/useCheckout';
import { useCartInfo } from '../../hooks/useCartInfo';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { Link } from 'react-router-dom';

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
  const { handleCheckout, loadingPayment } = useCheckout();
  const { total } = useCartInfo(data);
  const { handleProduct } = useAsideDrawer();

  const handleOrder = () => {
    data.products.data.forEach((product: ProductEntity) =>
      handleProduct(
        product.id,
        false,
        true,
        product.attributes!.size!,
        product.attributes!.color!,
        product.attributes!.cartCounter!,
        'cart'
      )
    );
  };

  return (
    <div className='totals'>
      <Typography
        variant='h4'
        sx={{
          color: 'white',
          marginBottom: '2rem',
        }}
      >
        {target == 'cart' ? 'cart totals' : 'totals'}
      </Typography>
      <StyledCartTotals>
        <div className='totalRow'>
          <Typography variant='h4'>Subtotal:</Typography>
          <Typography variant='h5'>${total.toFixed(2)}</Typography>
        </div>
        <div className='totalRow'>
          <Typography variant='h4'>Shipping:</Typography>
          <Typography variant='h5'>$10.00</Typography>
        </div>
        <div className='totalRow'>
          <Typography variant='h4'>Total:</Typography>
          <Typography variant='h5'>${(total + 10.0).toFixed(2)}</Typography>
        </div>
        <Box sx={{ textAlign: 'center', width: '230px' }}>
          {target == 'cart' ? (
            <Button onClick={() => handleCheckout(data)}>
              {loadingPayment ? 'LOADING...' : 'PROCEED TO CHECKOUT'}
            </Button>
          ) : (
            <Link to={`${window.origin}/shopping-cart`}>
              <Button onClick={handleOrder}>ORDER NOW</Button>
            </Link>
          )}
        </Box>
      </StyledCartTotals>
    </div>
  );
};

export default CartTotals;
