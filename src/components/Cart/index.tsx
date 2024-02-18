import { Box, Drawer, styled } from '@mui/material';
import React, { useState } from 'react';
import CartFooter from './CartFooter';
import CartBody from './CartBody';
import Header from './Header';
import { products } from './_data';

export const CartContainer = styled(Box)({
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
    <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
      <CartContainer role='presentation'>
        <Header toggleDrawer={toggleDrawer} title='YOUR CART' />
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
