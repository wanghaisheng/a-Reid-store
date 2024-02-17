import ProductsHeader from './ProductsHeader';
import ProductsGrid from './ProductsGrid';
import { useState } from 'react';
import ProductView from './ProductView';
import PageContainer from '../../components/PageContainer';

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <PageContainer>
      <ProductsHeader />
      <ProductsGrid setOpen={setOpen} />
      <ProductView open={open} setOpen={setOpen} />
    </PageContainer>
  );
};

export default Products;
