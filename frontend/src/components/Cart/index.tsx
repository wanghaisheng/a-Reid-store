import AsideDrawer from '../AsideDrawer';
import Header from '../AsideDrawer/Header';
import Body from '../AsideDrawer/Body';
import Footer from '../AsideDrawer/Footer';
import CartFooter from './CartFooter';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';
import { ProductEntity } from '../../gql/graphql';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { loadingCartProducts, errorCartProducts, cartProducts, handleCart } = useAsideDrawer();
  const { activeUser } = useAuth();
  const { getLatestStoredValue, removeSessionProduct } = useSessionStorage('cartProducts');
  const { t } = useTranslation();

  const handleRemoveProduct = async (product: ProductEntity) => {
    if (activeUser) {
      await handleCart('DELETE', { id: product.id, name: product.attributes?.name });
    } else {
      removeSessionProduct(product, 'cartProducts');
    }
  };

  if (loadingCartProducts) return false;
  if (errorCartProducts) return <p>Error : {errorCartProducts.message}</p>;

  return (
    <AsideDrawer>
      <Header title={t('YOUR_CART')} />
      <Body
        name={t('ShoppingCart2')}
        products={activeUser ? cartProducts : getLatestStoredValue('cartProducts').data}
        handleRemoveProduct={handleRemoveProduct}
      />
      <Footer>
        <CartFooter />
      </Footer>
    </AsideDrawer>
  );
};

export default Cart;
