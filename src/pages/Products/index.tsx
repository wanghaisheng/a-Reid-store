import { styled } from '@mui/material';
import ProductsHeader from './ProductsHeader';
import ProductsGrid from './ProductsGrid';
import { useState } from 'react';
import ProductView from './ProductView';

const Container = styled('div')({
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px',
  borderBottom: `2px solid white`,
  padding: '8rem 0',
  minHeight: '100vh',
});

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
          <ProductsHeader />
          <ProductsGrid setOpen={setOpen} />
        </div>
      </Container>
      <ProductView open={open} setOpen={setOpen} />
    </>
  );
};

export default Products;
