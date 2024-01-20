import { IconButton, Menu } from '@mui/material';
import { useState } from 'react';
import MenuItemEl from './MenuItemEl';
import { motion } from 'framer-motion';
import MenuToggleIcon from './MenuToggleIcon';

const MobileNavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
              height: '60vh',
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
        <MenuItemEl onCloseMenu={handleClose}>Home</MenuItemEl>
        <MenuItemEl onCloseMenu={handleClose}>My account</MenuItemEl>
        <MenuItemEl onCloseMenu={handleClose}>Products</MenuItemEl>
        <MenuItemEl onCloseMenu={handleClose}>Partnership</MenuItemEl>
        <MenuItemEl onCloseMenu={handleClose}>About us</MenuItemEl>
        <MenuItemEl onCloseMenu={handleClose}>Contact us</MenuItemEl>
      </Menu>
    </>
  );
};

export default MobileNavMenu;
