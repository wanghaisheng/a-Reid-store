import ProductCartDetails from '../Products/ProductCartDetails';
import ProductGalleryBox from '../Products/ProductGalleryBox';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { ModalContainer } from '../Products/ProductView';
import { styled } from '@mui/system';
import { products } from './_data';

const Container = styled(ModalContainer)(({ theme }) => ({
  width: '100%',
  borderRadius: '2rem',
  overflow: 'clip',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    maxHeight: 'auto',
  },
}));

const ProductDetails = () => {
  const { id } = useParams();

  const { thumbs, img } = products[0];

  return (
    <PageContainer>
      <Container>
        <ProductGalleryBox thumbs={thumbs} img={img} />
        <ProductCartDetails />
      </Container>
    </PageContainer>
  );
};

export default ProductDetails;
