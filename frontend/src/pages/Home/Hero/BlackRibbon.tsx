import { styled } from '@mui/material';
import { motion } from 'framer-motion';

const RibbonContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 20%, 0% 98%)',
    position: 'absolute',
    top: '-4rem',
    padding: '7rem',
    width: '100%',
    background: theme.palette.mode == 'light' ? 'white' : '#2F1C40',
  },
  '&::after': {
    content: '""',
    display: 'block',
    clipPath: 'polygon(0% 60%, 100% 38%, 100% 100%, 0% 100%)',
    position: 'absolute',
    bottom: '-6rem',
    padding: '7rem',
    width: '100%',
    background: theme.palette.mode == 'light' ? theme.palette.gray.main : '#09090B',
    [theme.breakpoints.up('sm')]: {
      clipPath: 'polygon(0% 60%, 100% 20%, 100% 100%, 0% 100%)',
    },
    [theme.breakpoints.up('lg')]: {
      clipPath: 'polygon(0% 60%, 100% 15%, 100% 100%, 0% 100%)',
    },
  },
}));

const StyledBlackRibbon = styled('div')(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  transform: 'skewY(-4deg)',
  position: 'relative',
  zIndex: 100,
  display: 'flex',
  borderTop: theme.palette.mode == 'light' ? 'none' : '2px solid white',
  borderBottom: theme.palette.mode == 'light' ? 'none' : '2px solid white',
  '& .ribbonSlide': {
    height: '38px',
    display: 'inline-block',
    background: '#09090B',
  },
}));

const BlackRibbon = () => {
  const scrollVariants = {
    animate: {
      x: '-100%',
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 10,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <RibbonContainer>
      <StyledBlackRibbon>
        <motion.div className='ribbonSlide' variants={scrollVariants} animate='animate'>
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
        </motion.div>
        <motion.div className='ribbonSlide' variants={scrollVariants} animate='animate'>
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
          <img src='/assets/home/siteLogo2.png' alt='' />
        </motion.div>
      </StyledBlackRibbon>
    </RibbonContainer>
  );
};

export default BlackRibbon;
