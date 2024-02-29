import { IconButton, Theme, useMediaQuery } from '@mui/material';
import Logo from '../../assets/siteLogo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SiteLogo = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Link to='/'>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='logo'
        style={{ backgroundColor: 'transparent' }}
        component={motion.button}
        whileTap={{ scale: 0.90 }}
        disableRipple
      >
        <img src={Logo} alt='Reid website logo' width={matches ? 75 : 90} />
      </IconButton>
    </Link>
  );
};

export default SiteLogo;
