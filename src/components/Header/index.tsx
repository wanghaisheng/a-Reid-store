import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container, Theme, useMediaQuery } from '@mui/material';
import MobileMenu from './MobileNavMenu';
import SiteLogo from './SiteLogo';
import FullScreenMenu from './FullScreenNavMenu';
import GeneralSettings from './GeneralSettings';
import useAppBarStyleOnScroll from './useAppBarStyleOnScroll';
import FullScreenNavLinks from './FullScreenNavLinks';

const Header = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down(1024));
  const { appBarStyleOnScroll, scrollPosition } = useAppBarStyleOnScroll();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        elevation={scrollPosition > 0 && scrollY != 0 ? 4 : 0}
        sx={appBarStyleOnScroll}
      >
        <Container maxWidth='xl'>
          <Toolbar>
            {matches && <MobileMenu />}
            <SiteLogo />
            <Box sx={{ flexGrow: 1 }}>{!matches && <FullScreenNavLinks />}</Box>
            {matches ? <GeneralSettings /> : <FullScreenMenu />}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* a workaround as an App bar Offset */}
    </Box>
  );
};

export default Header;
