import { Badge, Theme, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeSwitch from './ThemeSwtich';
import LanguageLocalizationMenu from './LanguageLocalizationMenu';
import StyledIconButton from '../Buttons/StyledIconButton';
import StyledButton from '../Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FullScreenNavMenu = () => {
  const matchesFullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up(1100));

  return (
    <>
      <ThemeSwitch />
      <LanguageLocalizationMenu />
      {matchesFullScreen && (
        <Link to='/account'>
          <StyledButton
            sx={{
              ml: 2,
              mr: 2,
              color: 'black',
              bgcolor: 'secondary.main',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
            component={motion.button}
            whileTap={{ scale: 0.9 }}
          >
            My Account
          </StyledButton>
        </Link>
      )}
      <StyledIconButton size='large' aria-label='show 4 new items' color='inherit'>
        <Badge badgeContent={4} color='secondary' sx={{ span: { fontWeight: 'bold' } }}>
          <ShoppingCartIcon />
        </Badge>
      </StyledIconButton>
      <StyledIconButton size='large' aria-label='show 4 new items' color='inherit'>
        <Badge badgeContent={4} color='secondary' sx={{ span: { fontWeight: 'bold' } }}>
          <FavoriteIcon />
        </Badge>
      </StyledIconButton>
    </>
  );
};

export default FullScreenNavMenu;
