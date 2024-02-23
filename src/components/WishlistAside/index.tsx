import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContainer } from '../Cart';
import Header from '../Cart/Header';
import CartBody from './CartBody';
import { Button } from '../Cart/CartFooter';
import { products } from './_data';

const WishlistAside = () => {
  const [cartProducts, setCartProducts] = useState(
    products.filter((p, index) => {
      if (index < 10) return p;
    })
  );
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
        <Header toggleDrawer={toggleDrawer} title='YOUR Wishlist' />
        <CartBody
          cartProducts={cartProducts}
          toggleDrawer={toggleDrawer}
          handleRemoveProduct={handleRemoveProduct}
        />
        {cartProducts.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <Link to='shopping-cart'>
              <Button onClick={toggleDrawer(false)}>ORDER NOW</Button>
            </Link>
          </Box>
        )}
      </CartContainer>
    </Drawer>
  );
};

export default WishlistAside;
