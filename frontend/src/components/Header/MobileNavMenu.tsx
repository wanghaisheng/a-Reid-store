import { IconButton, Menu } from '@mui/material';
import { useState } from 'react';
import MenuItemEl from './MenuItemEl';
import { motion } from 'framer-motion';
import MenuToggleIcon from './MenuToggleIcon';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type StyledNavLinkProps = {
  path: string;
  targetName: string;
  onClose: () => void;
};

const StyledNavLink = ({ path, targetName, onClose }: StyledNavLinkProps) => {
  return (
    <NavLink to={path} style={{ textDecoration: 'none' }}>
      {({ isActive }) => {
        return (
          <MenuItemEl onCloseMenu={onClose} isActive={isActive}>
            {targetName}
          </MenuItemEl>
        );
      }}
    </NavLink>
  );
};

const MobileNavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 1, ml: -1.5 }}
        onClick={handleClick}
        component={motion.button}
        animate={open ? 'open' : 'closed'}
      >
        <MenuToggleIcon />
      </IconButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
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
              bgcolor: 'primary.light',
              borderRadius: '25px',
              padding: '2rem 0',
              width: '90%',
              m: '0 5% 0 5%',
              left: '0 !important',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& .MuiList-root': { width: '100%' },
            },
          },
        }}
      >
        <StyledNavLink path='/' targetName={t('Home')} onClose={handleClose} />
        <StyledNavLink path='/account' targetName={t('MyAccount')} onClose={handleClose} />
        <StyledNavLink path='/products' targetName={t('Products')} onClose={handleClose} />
        <StyledNavLink path='/shopping-cart' targetName={t('ShoppingCart')} onClose={handleClose} />
        <StyledNavLink path='/wishlist' targetName={t('Wishlist')} onClose={handleClose} />
        <StyledNavLink path='/partnership' targetName={t('Partnership')} onClose={handleClose} />
        <StyledNavLink path='/about' targetName={t('AboutUs')} onClose={handleClose} />
        <StyledNavLink path='/contact' targetName={t('ContactUs')} onClose={handleClose} />
      </Menu>
    </>
  );
};

export default MobileNavMenu;
