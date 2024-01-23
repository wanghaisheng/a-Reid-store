import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container, Theme, useMediaQuery } from '@mui/material';
import AppBarOffset from './AppBarOffset';
import MobileMenu from './MobileNavMenu';
import SiteLogo from './SiteLogo';
import FullScreenMenu from './FullScreenNavMenu';
import GeneralSettings from './GeneralSettings';
import useAppBarStyleOnScroll from './useAppBarStyleOnScroll';
import StyledNavLink from './StyledNavLink';

const Header = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down(1024));
  const matchesFullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up(1100));
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
            <Box sx={{ flexGrow: 1 }}>
              {!matches && (
                <Container
                  maxWidth='sm'
                  sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}
                >
                  <StyledNavLink to='/'>
                    <span>Home</span>
                  </StyledNavLink>
                  {!matchesFullScreen && (
                    <StyledNavLink to='/account'>
                      <span>My account</span>
                    </StyledNavLink>
                  )}
                  <StyledNavLink to='/products'>
                    <span>Products</span>
                  </StyledNavLink>
                  <StyledNavLink to='/partnership'>
                    <span>Partnership</span>
                  </StyledNavLink>
                  <StyledNavLink to='/about'>
                    <span>About us</span>
                  </StyledNavLink>
                  <StyledNavLink to='/contact'>
                    <span>Contact us</span>
                  </StyledNavLink>
                </Container>
              )}
            </Box>
            {matches ? <GeneralSettings /> : <FullScreenMenu />}
          </Toolbar>
        </Container>
      </AppBar>
      <AppBarOffset />
    </Box>
  );
};

export default Header;
