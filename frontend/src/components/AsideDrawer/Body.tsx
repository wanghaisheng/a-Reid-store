import { Box, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { closeDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import StyledBody from './StyledBody';
import Empty from './Empty';
import { Maybe, ProductEntity } from '../../gql/graphql';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useAsideDrawer } from '../../graphql/hooks';

type BodyProps = {
  name: string;
  products: ProductEntity[];
  handleRemoveProduct: (id: Maybe<string> | undefined, isLiked: boolean) => void;
  cartIcon?: boolean;
};

const Body = ({ name, products, handleRemoveProduct, cartIcon }: BodyProps) => {
  const dispatch = useAppDispatch();
  const { activeDrawer } = useAppSelector((store) => store.drawer);
  const { handleCartProduct } = useAsideDrawer();

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
                    if (activeDrawer == 'wishlist')
                      handleRemoveProduct(product.id, product.attributes!.isAddedToCart!);
                    if (activeDrawer == 'cart')
                      handleRemoveProduct(product.id, product.attributes!.isLiked!);
                  }}
                />
              </Box>
            </Box>
            <div className='cartDetails'>
              <Typography
                variant='body1'
                sx={{ mb: '1.5rem', '& a': { color: 'black', textDecoration: 'none' } }}
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
                onClick={() => handleCartProduct(product.id, false, true, 'S', 'Red', 1)}
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
