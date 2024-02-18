import { Box, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Link } from 'react-router-dom';
import EmptyCart from '../Cart/EmptyCart';
import { CartBodyProps, StyledCartBody } from '../Cart/CartBody';

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
            <AddShoppingCartOutlinedIcon sx={{ color: 'gray.dark', cursor: 'pointer' }} />
          </Box>
        ))}
        {cartProducts.length == 0 && <EmptyCart toggleDrawer={toggleDrawer} />}
      </>
    </StyledCartBody>
  );
};

export default CartBody;
