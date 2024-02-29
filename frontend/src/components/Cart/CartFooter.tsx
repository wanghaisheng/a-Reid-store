import { Box, Typography, styled } from '@mui/material';
import StyledButton from '../Buttons/StyledButton';
import { Link } from 'react-router-dom';

export const Button = styled(StyledButton)(({ theme }) => ({
  padding: '1rem 3rem',
  color: 'white',
  background: 'black',
  '&:hover': { background: theme.palette.primary.main },
}));

const CartFooter = ({ toggleDrawer }: { toggleDrawer: (open: boolean) => () => void }) => {
  return (
    <div className='cartFooter'>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '2rem' }}>
        Total: $75.00
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Link to='shopping-cart'>
          <Button onClick={toggleDrawer(false)}>VIEW CART</Button>
        </Link>
        <Link to='checkout'>
          <Button onClick={toggleDrawer(false)}>CHECK OUT</Button>
        </Link>
      </Box>
    </div>
  );
};

export default CartFooter;
