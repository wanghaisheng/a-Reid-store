import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeSwitch from './ThemeSwtich';
import LanguageLocalizationMenu from './LanguageLocalizationMenu';
import StyledIconButton from '../Buttons/StyledIconButton';
import StyledButton from '../Buttons/StyledButton';

const FullScreenNavMenu = () => {
  return (
    <>
      <ThemeSwitch />
      <LanguageLocalizationMenu />
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
      >
        My Account
      </StyledButton>
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