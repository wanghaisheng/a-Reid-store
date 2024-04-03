import ProductsGrid from './ProductsGrid';
import ProductView from './ProductView';
import PageContainer from '../../components/PageContainer';
import { useAppSelector } from '../../app/store';
import { Outlet } from 'react-router-dom';
import Toast from '../../components/Toasts/Toast';

const Products = () => {
  const { modalItem } = useAppSelector((store) => store.modal);

  return (
    <PageContainer>
      <ProductsGrid />
      {modalItem && <ProductView modalItem={modalItem} />}
      <Toast />
      <Outlet />
    </PageContainer>
  );
};

export default Products;
