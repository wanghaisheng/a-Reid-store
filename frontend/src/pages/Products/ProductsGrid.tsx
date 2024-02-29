import { Paper, styled } from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './queries';
import { useAppDispatch } from '../../app/store';
import { openModal, setModalItem } from '../../app/features/modalSlice';
import { Product } from './types';

const StyledProductsGrid = styled('div')(({ theme }) => ({
  margin: '6rem auto',
  display: 'grid',
  justifyItems: 'center',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'repeat(auto-fill, 1fr)',
  gap: '3rem',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const StyledProduct = styled('div')({
  height: '400px',
  width: '275px',
  color: 'white',

  '& .picture': {
    height: '335px',
    borderRadius: '1.5rem',
    border: '2px solid rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.4s ease',
    },

    '& .quickView': {
      textAlign: 'center',
      visibility: 'hidden',
      opacity: 0,
      transition: 'all 0.4s ease',
    },

    '&:hover': {
      '& img': {
        transform: 'scale(1.1)',
      },
      '& .quickView': {
        visibility: 'visible',
        opacity: 1,
        transform: 'translate(0, -6rem)',
      },
    },
  },

  '& .footer': {
    height: '65px',

    '& .title': {
      padding: '1rem 0 0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      '& a': {
        color: 'white',
        textDecoration: 'none',
      },
    },
  },
});

const ProductsGrid = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const dispatch = useAppDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleOpenModal = (product: Product) => {
    dispatch(openModal());
    dispatch(setModalItem({ product }));
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <StyledProductsGrid>
        {data.products.data.map((product: Product) => (
          <StyledProduct key={product.attributes.product_id}>
            <Paper elevation={6} className='picture'>
              <img src={product.attributes.img} />
              <div className='quickView'>
                <StyledButton
                  sx={{
                    bgcolor: 'gray.main',
                    color: 'black',
                    '&:hover': { bgcolor: 'black', color: 'gray.main' },
                  }}
                  onClick={() => handleOpenModal(product)}
                >
                  Quick View
                </StyledButton>
              </div>
            </Paper>
            <div className='footer'>
              <div className='title'>
                <Link to={`${product.attributes.product_id}`}>{product.attributes.name}</Link>
                <FavoriteBorderIcon sx={{ cursor: 'pointer' }} />
              </div>
              <div className='price'>$ {product.attributes.price}</div>
            </div>
          </StyledProduct>
        ))}
      </StyledProductsGrid>
      <div style={{ textAlign: 'center' }}>
        <StyledButton
          sx={{
            bgcolor: 'gray.main',
            color: 'black',
            p: '1rem 5rem',
            '&:hover': { bgcolor: 'black', color: 'gray.main' },
          }}
        >
          LOAD MORE
        </StyledButton>
      </div>
    </>
  );
};

export default ProductsGrid;
