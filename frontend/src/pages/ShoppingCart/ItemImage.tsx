import { Box, styled } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { ProductEntity } from '../../gql/graphql';

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
  const { handleProduct } = useAsideDrawer();

  const handleRemoveProduct = (product: ProductEntity) => {
    handleProduct(
      product.id,
      target == 'wishlist' ? false : product.attributes!.isLiked!,
      target == 'cart' ? false : product.attributes!.isAddedToCart!,
      product.attributes!.size!,
      product.attributes!.color!,
      product.attributes!.cartCounter!,
      target
    );
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
