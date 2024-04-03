import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { closeDrawer } from '../../app/features/drawerSlice';
import Button from '../AsideDrawer/Button';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { useCartInfo } from '../../hooks/useCartInfo';
import { useCheckout } from '../../hooks/useCheckout';

const CartFooter = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { isAddedToCart: true, isLiked: false },
  });
  const { total } = useCartInfo(data);
  const { handleCheckout } = useCheckout();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='cartFooter'>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '2rem' }}>
        Total: ${total.toFixed(2)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Link to='shopping-cart'>
          <Button onClick={() => dispatch(closeDrawer())}>VIEW CART</Button>
        </Link>
        {data.products.data.length && (
          <Button
            onClick={() => {
              handleCheckout(data);
              dispatch(closeDrawer());
            }}
          >
            CHECKOUT
          </Button>
        )}
      </Box>
    </div>
  );
};

export default CartFooter;
