import { MenuItem } from '@mui/material';
import { motion } from 'framer-motion';

type MenuItemElProps = {
  children: string | React.ReactNode;
  onCloseMenu: () => void;
  isActive?: boolean;
};

const MenuItemEl = ({ children, onCloseMenu, isActive }: MenuItemElProps) => {
  return (
    <MenuItem
      onClick={() => onCloseMenu()}
      sx={{
        color: isActive ? 'secondary.main' : 'white',
        fontSize: '2rem',
        padding: '1rem 0',
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
