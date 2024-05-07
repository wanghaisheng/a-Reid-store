import { Box, Typography, useTheme } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { closeDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import StyledBody from './StyledBody';
import Empty from './Empty';
import { ProductEntity } from '../../gql/graphql';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type BodyProps = {
  name: string;
  products: ProductEntity[];
  handleRemoveProduct: (product: ProductEntity) => void;
  cartIcon?: boolean;
};

const Body = ({ name, products, handleRemoveProduct, cartIcon }: BodyProps) => {
  const dispatch = useAppDispatch();
  const { activeDrawer } = useAppSelector((store) => store.drawer);
  const { handleProduct } = useAsideDrawer();
  const { activeUser } = useAuth();
  const { setValue } = useSessionStorage('cartProducts');
  const theme = useTheme();

  const handleCartProduct = (product: ProductEntity) => {
    if (activeUser) {
      handleProduct(
        product.id,
        false,
        true,
        product.attributes!.size!,
        product.attributes!.color!,
        product.attributes!.cartCounter!,
        'cart'
      );
    } else {
      setValue(product);
    }
  };

  return (
    <StyledBody className='lenis lenis-smooth'>
      <>
        {products.map((product) => (
          <Box key={product.id} className='cartItem'>
            <Box className='itemImg'>
              <img src={product.attributes?.img} />
              <Box className='removeProduct'>
                <DeleteForeverIcon
                  sx={{ color: 'gray.main' }}
                  onClick={() => {
                    handleRemoveProduct(product);
                  }}
                />
              </Box>
            </Box>
            <div className='cartDetails'>
              <Typography
                variant='body1'
                sx={{
                  mb: '1.5rem',
                  '& a': {
                    color: theme.palette.mode == 'light' ? 'black' : 'white',
                    textDecoration: 'none',
                  },
                }}
              >
                <Link to={`products/${product.id}`} onClick={() => dispatch(closeDrawer())}>
                  {product.attributes!.name.length > 15
                    ? activeDrawer == 'wishlist'
                      ? product.attributes?.name.substring(0, 13) + '...'
                      : product.attributes?.name.substring(0, 25) + '...'
                    : product.attributes?.name}
                </Link>
              </Typography>
              <Typography variant='body1' sx={{ color: 'gray.dark' }}>
                {activeDrawer == 'wishlist'
                  ? `$ ${product.attributes?.price}`
                  : `${product.attributes?.cartCounter} x $ ${product.attributes?.price}`}
              </Typography>
            </div>
            {cartIcon && (
              <AddShoppingCartOutlinedIcon
                sx={{ color: 'gray.dark', cursor: 'pointer' }}
                onClick={() => handleCartProduct(product)}
              />
            )}
          </Box>
        ))}
        {products.length == 0 && <Empty name={name} />}
      </>
    </StyledBody>
  );
};

export default Body;
