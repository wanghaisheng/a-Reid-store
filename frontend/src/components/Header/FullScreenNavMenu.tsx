import { Badge, Theme, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeSwitch from './ThemeSwtich';
import LanguageLocalizationMenu from './LanguageLocalizationMenu';
import StyledIconButton from '../Buttons/StyledIconButton';
import StyledButton from '../Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { openDrawer, setSessionCounters } from '../../app/features/drawerSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';

const FullScreenNavMenu = () => {
  const matchesFullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up(1150));
  const { wishlistCounter, sessionWishlistCounter, cartCounter, sessionCartCounter } =
    useAppSelector((store) => store.drawer);
  const dispatch = useAppDispatch();
  const { activeUser } = useAuth();
  const { getLatestStoredValue } = useSessionStorage('wishlistProducts');
  const { getLatestStoredValue: getLatestStoredCartValue } = useSessionStorage('cartProducts');

  useEffect(() => {
    if (!activeUser)
      dispatch(
        setSessionCounters({
          key: 'wishlistProducts',
          products: getLatestStoredValue('wishlistProducts'),
        })
      );
    dispatch(
      setSessionCounters({
        key: 'cartProducts',
        products: getLatestStoredCartValue('cartProducts'),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThemeSwitch />
      <LanguageLocalizationMenu />
      {matchesFullScreen && (
        <Link to='/account'>
          <StyledButton
            sx={{
              p: '0.3rem 1.8rem',
              ml: 2,
              mr: 2,
              color: 'black',
              bgcolor: 'secondary.main',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            component={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            My Account
          </StyledButton>
        </Link>
      )}
      <StyledIconButton
        onClick={() => dispatch(openDrawer({ activeDrawer: 'cart' }))}
        size='large'
        aria-label='show 4 new items'
        color='inherit'
      >
        <Badge
          badgeContent={activeUser ? cartCounter : sessionCartCounter}
          showZero
          color='secondary'
          sx={{ span: { fontWeight: 'bold' } }}
        >
          <ShoppingCartIcon />
        </Badge>
      </StyledIconButton>
      <StyledIconButton
        onClick={() => dispatch(openDrawer({ activeDrawer: 'wishlist' }))}
        size='large'
        aria-label='show 4 new items'
        color='inherit'
      >
        <Badge
          badgeContent={activeUser ? wishlistCounter : sessionWishlistCounter}
          showZero
          color='secondary'
          sx={{ span: { fontWeight: 'bold' } }}
        >
          <FavoriteIcon />
        </Badge>
      </StyledIconButton>
    </>
  );
};

export default FullScreenNavMenu;
