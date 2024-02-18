import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledButton from '../Buttons/StyledButton';

const StyledEmptyCart = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& img': {
    width: '80%',
    display: 'block',
    margin: '0 auto',
  },

  '& .button': {
    margin: '0 auto',
    display: 'block',
    padding: '1rem 3rem',
    color: 'white',
    background: 'black',
    '&:hover': { background: theme.palette.primary.main },
    '& a': { color: 'white', textDecoration: 'none' },
  },
}));

const EmptyCart = ({ toggleDrawer }: { toggleDrawer: (open: boolean) => () => void }) => {
  return (
    <StyledEmptyCart>
      <Box>
        <img src='./assets/pngwing.com.png' />
        <Typography variant='h5' sx={{ textAlign: 'center', mb: '2rem' }}>
          Your cart is empty!
        </Typography>
        <Typography variant='body1' sx={{ textAlign: 'center', mb: '2rem' }}>
          You have no items in your shopping cart.
          <br /> Let's go buy something!
        </Typography>
        <StyledButton className='button' onClick={toggleDrawer(false)}>
          <Link to='products'>SHOP NOW</Link>
        </StyledButton>
      </Box>
    </StyledEmptyCart>
  );
};

export default EmptyCart;
