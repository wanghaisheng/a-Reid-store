import { MenuItem } from '@mui/material';
import { motion } from 'framer-motion';

type MenuItemElProps = {
  children: string;
  onCloseMenu: () => void;
};

const MenuItemEl = ({ children, onCloseMenu }: MenuItemElProps) => {
  return (
    <MenuItem
      onClick={() => onCloseMenu()}
      sx={{
        color: 'white',
        fontSize: '2rem',
        justifyContent: 'center',
        '&:hover': { color: 'secondary.main' },
      }}
      component={motion.li}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </MenuItem>
  );
};

export default MenuItemEl;
