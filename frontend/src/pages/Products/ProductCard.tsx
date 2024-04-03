import { Paper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch } from '../../app/store';
import { openModal, setModalItem } from '../../app/features/modalSlice';
import StyledButton from '../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { motion } from 'framer-motion';
import { ProductEntity } from '../../gql/graphql';
import StyledProductCard from './StyledProductCard';

const ProductCard = ({ product }: { product: ProductEntity }) => {
  const dispatch = useAppDispatch();
  const { handleProduct } = useAsideDrawer();

  const handleOpenModal = (id: string) => {
    dispatch(openModal());
    dispatch(setModalItem({ id }));
  };

  const handleFavoriteProduct = (isLiked: boolean) => {
    handleProduct(
      product.id,
      isLiked,
      product.attributes!.isAddedToCart!,
      product.attributes!.size!,
      product.attributes!.color!,
      product.attributes!.cartCounter!,
      'wishlist'
    );
  };

  return (
    <>
      <StyledProductCard key={product.id}>
        <Paper elevation={6} className='picture'>
          <img src={product.attributes?.img} />
          <div className='quickView'>
            <StyledButton
              sx={{
                bgcolor: 'gray.main',
                color: 'black',
                '&:hover': { bgcolor: 'black', color: 'gray.main' },
              }}
              onClick={() => handleOpenModal(product.id!)}
            >
              Quick View
            </StyledButton>
          </div>
        </Paper>
        <div className='footer'>
          <div className='title'>
            <Link to={`${product.id}`}>{product.attributes?.name}</Link>
            {!product.attributes?.isAddedToCart &&
              (product.attributes?.isLiked ? (
                <FavoriteIcon
                  sx={{ cursor: 'pointer', outline: 0 }}
                  onClick={() => handleFavoriteProduct(false)}
                  component={motion.svg}
                  whileTap={{ scale: 0.75 }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ cursor: 'pointer', outline: 0 }}
                  onClick={() => handleFavoriteProduct(true)}
                  component={motion.svg}
                  whileTap={{ scale: 0.75 }}
                />
              ))}
          </div>
          <div className='price'>$ {product.attributes?.price}</div>
        </div>
      </StyledProductCard>
    </>
  );
};

export default ProductCard;
