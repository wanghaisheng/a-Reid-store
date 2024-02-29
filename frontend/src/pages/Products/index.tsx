import ProductsHeader from './ProductsHeader';
import ProductsGrid from './ProductsGrid';
import ProductView from './ProductView';
import PageContainer from '../../components/PageContainer';

const Products = () => {
  return (
    <PageContainer>
      <ProductsHeader />
      <ProductsGrid />
      <ProductView />
    </PageContainer>
  );
};

export default Products;
