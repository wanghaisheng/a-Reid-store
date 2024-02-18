import { Box, Typography, styled } from '@mui/material';
import StyledButton from '../Buttons/StyledButton';
import { Link } from 'react-router-dom';

const Button = styled(StyledButton)(({ theme }) => ({
  padding: '1rem 3rem',
  color: 'white',
  background: 'black',
  '&:hover': { background: theme.palette.primary.main },
  '& a': { color: 'white', textDecoration: 'none' },
}));

const CartFooter = ({ toggleDrawer }: { toggleDrawer: (open: boolean) => () => void }) => {
  return (
    <div className='cartFooter'>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mb: '2rem' }}>
        Total: $75.00
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Button onClick={toggleDrawer(false)}>
          <Link to='shopping-cart'>VIEW CART</Link>
        </Button>
        <Button onClick={toggleDrawer(false)}>
          <Link to='checkout'>CHECK OUT</Link>
        </Button>
      </Box>
    </div>
  );
};

export default CartFooter;
