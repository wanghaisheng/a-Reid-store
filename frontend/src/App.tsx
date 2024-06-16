import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ThemeContextProvider from './contexts/theme/ThemeContext';
import LocaleContextProvider from './contexts/locale/LocaleContext';
const Header = lazy(() => import('./components/Header'));
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Wishlist from './pages/Wishlist';
import Partnership from './pages/Partnership';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Cart from './components/Cart';
import WishlistAside from './components/WishlistAside';
import { useAppDispatch, useAppSelector } from './app/store';
import { useAsideDrawer } from './hooks/useAsideDrawer';
import { setDrawerCounters } from './app/features/drawerSlice';
import { Spinner } from './components/Spinners';

function App() {
  const { activeDrawer } = useAppSelector((store) => store.drawer);
  const { wishlistCounter, cartCounter } = useAsideDrawer();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (wishlistCounter) {
      dispatch(
        setDrawerCounters({
          target: 'wishlist',
          counter: wishlistCounter,
        })
      );
    }
    if (cartCounter) {
      dispatch(
        setDrawerCounters({
          target: 'cart',
          counter: cartCounter,
        })
      );
    }
  }, [wishlistCounter, cartCounter, dispatch]);

  useEffect(() => {
    // to prevent opening images in a new tap
    const allImages = document.querySelectorAll('img');
    for (const img of allImages) {
      ['contextmenu', 'dragstart'].forEach((event) => {
        img.addEventListener(event, (event) => event.preventDefault());
      });
    }
  });

  useEffect(() => {
    // to reload all opened browser taps after user login / logout
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'reloadTrigger') {
        window.location.reload();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <Suspense fallback={<Spinner />}>
          <Header />
          {activeDrawer == 'cart' && <Cart />}
          {activeDrawer == 'wishlist' && <WishlistAside />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<MyAccount />} />
            <Route path='/products'>
              <Route index element={<Products />} />
              <Route path=':id' element={<ProductDetails />} />
            </Route>
            <Route path='/shopping-cart' element={<ShoppingCart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/partnership' element={<Partnership />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
          <SmoothScroll />
          <ScrollToTop />
        </Suspense>
      </LocaleContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
