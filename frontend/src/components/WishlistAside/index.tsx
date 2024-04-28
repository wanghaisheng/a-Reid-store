import AsideDrawer from '../AsideDrawer';
import Header from '../AsideDrawer/Header';
import Body from '../AsideDrawer/Body';
import Footer from '../AsideDrawer/Footer';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '../AsideDrawer/Button';
import { closeDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { ProductEntity } from '../../gql/graphql';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useAuth from '../../hooks/useAuth';

const WishlistAside = () => {
  const { handleProduct } = useAsideDrawer();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((store) => store.drawer);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isLiked: true, isAddedToCart: false },
  });
  const { activeUser } = useAuth();
  const { getLatestStoredValue, removeSessionProduct } = useSessionStorage('wishlistProducts');
  const { setValue } = useSessionStorage('cartProducts');

  useEffect(() => {
    if (open) refetch();
  });

  const handleRemoveProduct = (product: ProductEntity) => {
    if (activeUser) {
      handleProduct(
        product.id,
        false,
        product.attributes!.isAddedToCart!,
        product.attributes!.size!,
        product.attributes!.color!,
        product.attributes!.cartCounter!,
        'wishlist'
      );
    } else {
      removeSessionProduct(product, 'wishlistProducts');
    }
  };

  const handleOrder = () => {
    if (activeUser) {
      data.products.data.forEach((product: ProductEntity) =>
        handleProduct(
          product.id,
          false,
          true,
          product.attributes!.size!,
          product.attributes!.color!,
          product.attributes!.cartCounter!,
          'cart'
        )
      );
    } else {
      getLatestStoredValue('wishlistProducts').data.forEach((product: ProductEntity) => {
        setValue(product);
      });
    }
    dispatch(closeDrawer());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const OrderButton = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
      <Link to='shopping-cart'>
        <Button onClick={handleOrder}>ORDER NOW</Button>
      </Link>
    </Box>
  );

  return (
    data && (
      <AsideDrawer>
        <Header title='YOUR WISHLIST' />
        <Body
          name='wishlist'
          products={activeUser ? data.products.data : getLatestStoredValue('wishlistProducts').data}
          handleRemoveProduct={handleRemoveProduct}
          cartIcon={true}
        />
        <Footer>
          {activeUser && data.products.data.length > 0 && <OrderButton />}
          {!activeUser && getLatestStoredValue('wishlistProducts').data.length > 0 && (
            <OrderButton />
          )}
        </Footer>
      </AsideDrawer>
    )
  );
};

export default WishlistAside;
