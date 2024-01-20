import { IconButton, Theme, useMediaQuery } from '@mui/material';
import Logo from '../../assets/siteLogo.png';

const SiteLogo = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <IconButton
      size='large'
      edge='start'
      color='inherit'
      aria-label='logo'
      style={{ backgroundColor: 'transparent' }}
    >
      <img src={Logo} alt='Reid website logo' width={matches ? 85 : 100} />
    </IconButton>
  );
};

export default SiteLogo;
