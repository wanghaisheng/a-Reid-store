import AsideDrawer from '../AsideDrawer';
import Header from '../AsideDrawer/Header';
import Body from '../AsideDrawer/Body';
import Footer from '../AsideDrawer/Footer';
import CartFooter from './CartFooter';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { useAppSelector } from '../../app/store';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { useEffect } from 'react';
import { ProductEntity } from '../../gql/graphql';

const Cart = () => {
  const { handleProduct } = useAsideDrawer();
  const { open } = useAppSelector((store) => store.drawer);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isAddedToCart: true, isLiked: false },
  });

  useEffect(() => {
    if (open) refetch();
  });

  const handleRemoveProduct = (product: ProductEntity) => {
    handleProduct(
      product.id,
      product.attributes!.isLiked!,
      false,
      product.attributes!.size!,
      product.attributes!.color!,
      product.attributes!.cartCounter!,
      'wishlist'
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <AsideDrawer>
      <Header title='YOUR CART' />
      <Body
        name='shopping cart'
        products={data.products.data}
        handleRemoveProduct={handleRemoveProduct}
      />
      <Footer>{data.products.data.length > 0 && <CartFooter />}</Footer>
    </AsideDrawer>
  );
};

export default Cart;
