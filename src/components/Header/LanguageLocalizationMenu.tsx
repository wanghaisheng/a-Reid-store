import { Button, ButtonProps, Menu, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import StyledButton from '../Buttons/StyledButton';
import MenuItemEl from './MenuItemEl';

const LanguageLocalizationButton = styled(StyledButton)<ButtonProps>(({ theme }) => ({
  color: 'white',
  maxWidth: 50,
  backgroundColor: theme.palette.primary.dark,
  'span.MuiButton-endIcon': {
    marginLeft: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
})) as typeof Button;

const LanguageLocalizationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openLangLocalizationMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <LanguageLocalizationButton
        id='demo-positioned-button'
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        En
      </LanguageLocalizationButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={openLangLocalizationMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              width: anchorEl && anchorEl.offsetWidth,
              bgcolor: 'primary.light',
              borderRadius: '15px',
            },
          },
        }}
      >
        <MenuItemEl onCloseMenu={handleClose}>En</MenuItemEl>
        <MenuItemEl onCloseMenu={handleClose}>Ar</MenuItemEl>
      </Menu>
    </>
  );
};

export default LanguageLocalizationMenu;
