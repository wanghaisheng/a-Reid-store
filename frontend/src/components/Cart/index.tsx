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
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';

const Cart = () => {
  const { handleProduct } = useAsideDrawer();
  const { open } = useAppSelector((store) => store.drawer);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { isAddedToCart: true, isLiked: false },
  });
  const { activeUser } = useAuth();
  const { getLatestStoredValue, removeSessionProduct } = useSessionStorage('cartProducts');

  useEffect(() => {
    if (open) refetch();
  });

  const handleRemoveProduct = (product: ProductEntity) => {
    if (activeUser) {
      handleProduct(
        product.id,
        product.attributes!.isLiked!,
        false,
        product.attributes!.size!,
        product.attributes!.color!,
        product.attributes!.cartCounter!,
        'cart'
      );
    } else {
      removeSessionProduct(product, 'cartProducts');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <AsideDrawer>
      <Header title='YOUR CART' />
      <Body
        name='shopping cart'
        products={activeUser ? data.products.data : getLatestStoredValue('cartProducts').data}
        handleRemoveProduct={handleRemoveProduct}
      />
      <Footer>
        <CartFooter />
      </Footer>
    </AsideDrawer>
  );
};

export default Cart;
