import { Paper, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ProductEntity } from '../../gql/graphql';
import { useAppDispatch } from '../../app/store';
import { openModal, setModalItem } from '../../app/features/modalSlice';
import StyledButton from '../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { useWishlist } from './hooks';
import { motion } from 'framer-motion';
import Toast from '../../components/Toasts/Toast';

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

const ProductCard = ({ product }: { product: ProductEntity }) => {
  const dispatch = useAppDispatch();
  const { handleWishlistProduct } = useWishlist();

  const handleOpenModal = (product: ProductEntity) => {
    dispatch(openModal());
    dispatch(setModalItem({ id: product.id }));
  };

  return (
    <>
      <StyledProduct key={product.id}>
        <Paper elevation={6} className='picture'>
          <img src={product.attributes?.img} />
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
            <Link to={`${product.id}`}>{product.attributes?.name}</Link>
            {product.attributes?.isLiked ? (
              <FavoriteIcon
                sx={{ cursor: 'pointer', outline: 0 }}
                onClick={() => handleWishlistProduct(product.id, false)}
                component={motion.svg}
                whileTap={{ scale: 0.75 }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ cursor: 'pointer', outline: 0 }}
                onClick={() => handleWishlistProduct(product.id, true)}
                component={motion.svg}
                whileTap={{ scale: 0.75 }}
              />
            )}
          </div>
          <div className='price'>$ {product.attributes?.price}</div>
        </div>
      </StyledProduct>
      <Toast />
    </>
  );
};

export default ProductCard;
