import { Box, Typography, styled } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';

export const StyledCartBody = styled('div')({
  height: '100%',
  overflow: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',

  '& .cartItem': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',

    '& .itemImg': {
      width: '60px',
      height: '80px',
      position: 'relative',
      '&:hover': {
        '& .removeProduct': { opacity: 1 },
      },

      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },

      '& .removeProduct': {
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      },
    },
  },
});

export type CartBodyProps = {
  cartProducts: {
    id: number;
    name: string;
    desc: string;
    img: string;
    thumbs: string[];
    price: number;
    isLiked: boolean;
  }[];
  toggleDrawer: (open: boolean) => () => void;
  handleRemoveProduct: (id: number) => void;
};

const CartBody = ({ cartProducts, toggleDrawer, handleRemoveProduct }: CartBodyProps) => {
  return (
    <StyledCartBody className='lenis lenis-smooth'>
      <>
        {cartProducts.map((product) => (
          <Box key={product.id} className='cartItem'>
            <Box className='itemImg'>
              <img src={product.img} />
              <Box className='removeProduct'>
                <DeleteForeverIcon
                  sx={{ color: 'gray.main' }}
                  onClick={() => handleRemoveProduct(product.id)}
                />
              </Box>
            </Box>
            <div className='cartDetails'>
              <Typography
                variant='body1'
                sx={{ mb: '1.5rem', '& a': { color: 'black', textDecoration: 'none' } }}
              >
                <Link to={`products/${product.id}`} onClick={toggleDrawer(false)}>
                  {product.name}
                </Link>
              </Typography>
              <Typography variant='body1' sx={{ color: 'gray.dark' }}>
                1 x ${product.price}
              </Typography>
            </div>
          </Box>
        ))}
        {cartProducts.length == 0 && <EmptyCart toggleDrawer={toggleDrawer} />}
      </>
    </StyledCartBody>
  );
};

export default CartBody;
