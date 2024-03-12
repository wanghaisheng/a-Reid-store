import { Paper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch } from '../../app/store';
import { openModal, setModalItem } from '../../app/features/modalSlice';
import StyledButton from '../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { useAsideDrawer } from '../../graphql/hooks';
import { motion } from 'framer-motion';
import Toast from '../../components/Toasts/Toast';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphql/queries';
import { Maybe } from '../../gql/graphql';
import StyledProductCard from './StyledProductCard';

const ProductCard = ({ id }: { id?: Maybe<string> | undefined }) => {
  const dispatch = useAppDispatch();
  const { handleWishlistProduct } = useAsideDrawer();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const handleOpenModal = (id: string) => {
    dispatch(openModal());
    dispatch(setModalItem({ id }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <StyledProductCard key={data.product.data.id}>
        <Paper elevation={6} className='picture'>
          <img src={data.product.data.attributes?.img} />
          <div className='quickView'>
            <StyledButton
              sx={{
                bgcolor: 'gray.main',
                color: 'black',
                '&:hover': { bgcolor: 'black', color: 'gray.main' },
              }}
              onClick={() => handleOpenModal(data.product.data.id)}
            >
              Quick View
            </StyledButton>
          </div>
        </Paper>
        <div className='footer'>
          <div className='title'>
            <Link to={`${data.product.data.id}`}>{data.product.data.attributes?.name}</Link>
            {!data.product.data.attributes?.isAddedToCart &&
              (data.product.data.attributes?.isLiked ? (
                <FavoriteIcon
                  sx={{ cursor: 'pointer', outline: 0 }}
                  onClick={() =>
                    handleWishlistProduct(
                      data.product.data.id,
                      false,
                      data.product.data.attributes.isAddedToCart
                    )
                  }
                  component={motion.svg}
                  whileTap={{ scale: 0.75 }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ cursor: 'pointer', outline: 0 }}
                  onClick={() =>
                    handleWishlistProduct(
                      data.product.data.id,
                      true,
                      data.product.data.attributes.isAddedToCart
                    )
                  }
                  component={motion.svg}
                  whileTap={{ scale: 0.75 }}
                />
              ))}
          </div>
          <div className='price'>$ {data.product.data.attributes?.price}</div>
        </div>
      </StyledProductCard>
      <Toast />
    </>
  );
};

export default ProductCard;
