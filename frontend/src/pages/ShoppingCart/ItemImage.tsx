import { Box, styled } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { ProductEntity } from '../../gql/graphql';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';

export const StyledImage = styled(Box)({
  width: '60px',
  height: '80px',
  position: 'relative',
  '&:hover': {
    '& .removeProduct': { opacity: 1 },
  },

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '& .removeProduct': {
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
});

const ItemImage = ({ product, target }: { product: ProductEntity; target: string }) => {
  const { handleCart, handleWishlist } = useAsideDrawer();
  const { activeUser } = useAuth();
  const { removeSessionProduct } = useSessionStorage('cartProducts');

  const handleRemoveProduct = async (product: ProductEntity) => {
    if (activeUser) {
      if (target == 'cart')
        await handleCart('DELETE', { id: product.id, name: product.attributes?.name });
      if (target == 'wishlist') await handleWishlist(false, product);
    } else {
      removeSessionProduct(product, target == 'cart' ? 'cartProducts' : 'wishlistProducts');
    }
  };

  return (
    <StyledImage>
      <img src={product.attributes?.img} />
      <Box className='removeProduct'>
        <DeleteForeverIcon
          sx={{ color: 'gray.main' }}
          onClick={() => {
            handleRemoveProduct(product);
          }}
        />
      </Box>
    </StyledImage>
  );
};

export default ItemImage;
