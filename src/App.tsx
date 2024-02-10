import { Routes, Route } from 'react-router-dom';
import ThemeContextProvider from './contexts/theme/ThemeContext';
import Header from './components/Header';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import WishList from './pages/WishList';
import Partnership from './pages/Partnership';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeContextProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<MyAccount />} />
        <Route path='/products' element={<Products />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/wish-list' element={<WishList />} />
        <Route path='/partnership' element={<Partnership />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <SmoothScroll />
      <ScrollToTop />
    </ThemeContextProvider>
  );
}

export default App;
