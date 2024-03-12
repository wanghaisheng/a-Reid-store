import { Badge, Theme, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeSwitch from './ThemeSwtich';
import LanguageLocalizationMenu from './LanguageLocalizationMenu';
import StyledIconButton from '../Buttons/StyledIconButton';
import StyledButton from '../Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { openDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch } from '../../app/store';

const FullScreenNavMenu = () => {
  const matchesFullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up(1150));
  const dispatch = useAppDispatch();

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
        <Badge badgeContent={4} color='secondary' sx={{ span: { fontWeight: 'bold' } }}>
          <ShoppingCartIcon />
        </Badge>
      </StyledIconButton>
      <StyledIconButton
        onClick={() => dispatch(openDrawer({ activeDrawer: 'wishlist' }))}
        size='large'
        aria-label='show 4 new items'
        color='inherit'
      >
        <Badge badgeContent={4} color='secondary' sx={{ span: { fontWeight: 'bold' } }}>
          <FavoriteIcon />
        </Badge>
      </StyledIconButton>
    </>
  );
};

export default FullScreenNavMenu;
