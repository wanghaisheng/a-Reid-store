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
import { useAsideDrawer } from '../../graphql/hooks';
import { Maybe } from '../../gql/graphql';

const WishlistAside = () => {
  const { handleWishlistProduct } = useAsideDrawer();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((store) => store.drawer);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isLiked: true, isAddedToCart: false },
  });

  useEffect(() => {
    if (open) refetch();
  });

  const handleRemoveProduct = (id: Maybe<string> | undefined, isAddedToCart: boolean) => {
    handleWishlistProduct(id, false, isAddedToCart);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    data && (
      <AsideDrawer>
        <Header title='YOUR WISHLIST' />
        <Body
          name='wishlist'
          products={data.products.data}
          handleRemoveProduct={handleRemoveProduct}
          cartIcon={true}
        />
        <Footer>
          {data.products.data.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <Link to='shopping-cart'>
                <Button onClick={() => dispatch(closeDrawer())}>ORDER NOW</Button>
              </Link>
            </Box>
          )}
        </Footer>
      </AsideDrawer>
    )
  );
};

export default WishlistAside;
