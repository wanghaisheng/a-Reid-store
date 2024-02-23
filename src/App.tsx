import { Routes, Route } from 'react-router-dom';
import ThemeContextProvider from './contexts/theme/ThemeContext';
import LocaleContextProvider from './contexts/Locale/LocaleContext';
import Header from './components/Header';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/CheckOut';
import Wishlist from './pages/Wishlist';
import Partnership from './pages/Partnership';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Cart from './components/Cart';
import WishlistAside from './components/WishlistAside';

function App() {
  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <Header />
        <Cart />
        <WishlistAside />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<MyAccount />} />
          <Route path='/products'>
            <Route index element={<Products />} />
            <Route path=':id' element={<ProductDetails />} />
          </Route>
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/partnership' element={<Partnership />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <SmoothScroll />
        <ScrollToTop />
      </LocaleContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
