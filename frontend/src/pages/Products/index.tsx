import ProductsHeader from './ProductsHeader';
import ProductsGrid from './ProductsGrid';
import ProductView from './ProductView';
import PageContainer from '../../components/PageContainer';
import { useAppSelector } from '../../app/store';
import { Outlet } from 'react-router-dom';

const Products = () => {
  const { modalItem } = useAppSelector((store) => store.modal);

  return (
    <PageContainer>
      <ProductsHeader />
      <ProductsGrid />
      {modalItem && <ProductView modalItem={modalItem} />}
      <Outlet />
    </PageContainer>
  );
};

export default Products;
