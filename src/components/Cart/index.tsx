import { Box, Drawer, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import CartFooter from './CartFooter';
import CartBody from './CartBody';
import { products } from './_data';

const CartContainer = styled(Box)({
  padding: '4rem',
  width: '390px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',

  '& .cartHeader': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Cart = () => {
  const [cartProducts, setCartProducts] = useState(products.filter((p, index) => index < 5 ?? p));
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const handleRemoveProduct = (id: number) => {
    setCartProducts(cartProducts.filter((p) => p.id !== id));
  };

  return (
    <Drawer variant='persistent' anchor='right' open={open} onClose={toggleDrawer(false)}>
      <CartContainer role='presentation'>
        <div className='cartHeader'>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            YOUR CART
          </Typography>
          <CloseIcon
            sx={{ fontSize: '3.5rem', cursor: 'pointer' }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          />
        </div>
        <CartBody
          cartProducts={cartProducts}
          toggleDrawer={toggleDrawer}
          handleRemoveProduct={handleRemoveProduct}
        />
        {cartProducts.length > 0 && <CartFooter toggleDrawer={toggleDrawer} />}
      </CartContainer>
    </Drawer>
  );
};

export default Cart;
