import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1500,
  });

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();
  }, [pathname]);

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleScroll}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab
          size='small'
          aria-label='scroll back to top'
          sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'white' } }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
