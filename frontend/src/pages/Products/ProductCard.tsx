import { Paper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch } from '../../app/store';
import { openModal, setModalItem } from '../../app/features/modalSlice';
import StyledButton from '../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { motion } from 'framer-motion';
import { Maybe, ProductEntity } from '../../gql/graphql';
import StyledProductCard from './StyledProductCard';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';

const ProductCard = ({ product }: { product: ProductEntity }) => {
  const dispatch = useAppDispatch();
  const {
    loadingWishlistProducts,
    errorWishlistProducts,
    wishlistProducts,
    handleWishlist,
    cartProducts,
  } = useAsideDrawer();

  const { activeUser } = useAuth();
  const { getLatestStoredValue, setValue } = useSessionStorage('wishlistProducts');
  const { getLatestStoredValue: getLatestStoredCartValue } = useSessionStorage('cartProducts');
  const foundCartProduct = getLatestStoredCartValue('cartProducts').data?.find(
    (e: ProductEntity) => e.id == product.id
  );
  const cartProduct = cartProducts?.find(
    (item: { attributes: { productId: Maybe<string> | undefined } }) =>
      item.attributes.productId == product.id
  );

  const handleOpenModal = (id: string) => {
    dispatch(openModal());
    dispatch(setModalItem({ id }));
  };

  const handleFavoriteProduct = (isLiked: boolean) => {
    if (activeUser) handleWishlist(isLiked, product);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    else setValue(product);
  };

  const LikeButton = () => {
    const renderIcon = (condition: boolean | null | undefined) => {
      if (condition) {
        return (
          <FavoriteIcon
            sx={{ cursor: 'pointer', outline: 0 }}
            onClick={() => handleFavoriteProduct(false)}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        );
      } else {
        return (
          <FavoriteBorderIcon
            sx={{ cursor: 'pointer', outline: 0 }}
            onClick={() => handleFavoriteProduct(true)}
            component={motion.svg}
            whileTap={{ scale: 0.75 }}
          />
        );
      }
    };

    if (activeUser) {
      if (loadingWishlistProducts) return false;
      if (errorWishlistProducts) return false;
      const foundProduct = wishlistProducts?.find((e: ProductEntity) => e.id == product.id);
      return renderIcon(Boolean(foundProduct));
    } else {
      const foundProduct = getLatestStoredValue('wishlistProducts').data?.find(
        (e: ProductEntity) => e.id == product.id
      );
      return renderIcon(Boolean(foundProduct));
    }
  };

  return (
    <StyledProductCard
      key={product.id}
      initial={{
        opacity: 0,
        y: '10rem',
        rotateY: 90,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateY: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
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
          {activeUser && !cartProduct ? (
            <LikeButton />
          ) : (
            !activeUser && !foundCartProduct && <LikeButton />
          )}
        </div>
        <div className='price'>$ {product.attributes?.price}</div>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
