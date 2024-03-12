import ProductGalleryBox from '../Products/ProductGalleryBox';
import ProductCartDetails from '../Products/ProductCartDetails';
import PageContainer from '../../components/PageContainer';
import { ModalContainer } from '../Products/ProductView';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/queries';
import { productThumbs } from './_data';

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
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });
  const thumbs = productThumbs.find((p) => p.id == id)?.thumbs;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <PageContainer>
      <Container>
        <ProductGalleryBox thumbs={thumbs!} img={data.product.data.attributes.img} />
        <ProductCartDetails loading={loading} error={error} product={data.product.data} />
      </Container>
    </PageContainer>
  );
};

export default ProductDetails;
