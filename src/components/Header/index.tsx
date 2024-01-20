import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Theme, useMediaQuery, useTheme } from '@mui/material';
import AppBarOffset from './AppBarOffset';
import MobileMenu from './MobileNavMenu';
import SiteLogo from './SiteLogo';
import FullScreenMenu from './FullScreenNavMenu';
import GeneralSettings from './GeneralSettings';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const Header = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down(640));
  const matchBugFix = useMediaQuery((theme: Theme) => theme.breakpoints.down(720));
  const { scrollYProgress } = useScroll();
  const [isDownScroll, setIsDownScroll] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const theme = useTheme();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const previous = scrollYProgress.getPrevious();
    setScrollPosition(latest);
    if (latest > previous && latest > +theme.mixins.toolbar.minHeight! / window.innerHeight) {
      setIsDownScroll(true);
    }
    if (latest == 0 || latest <= +theme.mixins.toolbar.minHeight! / window.innerHeight) {
      setIsDownScroll(false);
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }} id='back-to-top-anchor'>
      <AppBar
        position='fixed'
        elevation={scrollPosition > 0 ? 4 : 0}
        sx={{
          backdropFilter: scrollPosition > 0 ? 'blur(6px)' : 'none',
          backgroundColor: scrollPosition > 0 ? 'rgba(165, 129, 199, 0.5)' : 'default',
          width: !matchBugFix && isDownScroll ? '90%' : '100%',
          m: !matchBugFix && isDownScroll ? '0 5% 0  5%' : 0,
          borderBottomLeftRadius: isDownScroll ? 25 : 0,
          borderBottomRightRadius: isDownScroll ? 25 : 0,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar>
            {matches && <MobileMenu />}
            <SiteLogo />
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
            {matches ? <GeneralSettings /> : <FullScreenMenu />}
          </Toolbar>
        </Container>
      </AppBar>
      <AppBarOffset />
    </Box>
  );
};

export default Header;