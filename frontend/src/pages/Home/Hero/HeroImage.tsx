import { styled } from '@mui/material';
import PlayButton from './PlayButton';
import { motion } from 'framer-motion';

const StyledHeroImage = styled('div')(({ theme }) => ({
  maxWidth: '60%',
  margin: '3rem auto',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '45% !important',
  },
  '@media (min-width: 768px)': {
    maxWidth: '35% !important',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '30% !important',
  },
  '@media (min-width: 1024px)': {
    top: '-20rem',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '27.5% !important',
  },

  '& img': {
    maxWidth: '100% !important',
    borderRadius: 30,
    rotate: '8deg',
    position: 'absolute',
    top: 0,
    left: 0,
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
}));

const HeroImage = () => {
  return (
    <StyledHeroImage>
      <motion.img
        src='/assets/home/mainHero.jpeg'
        alt='hero image'
        initial={{
          opacity: 0.5,
          scale: 0.5,
          y: '50rem',
          rotate: -60,
        }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'linear' }}
      />
      <PlayButton />
    </StyledHeroImage>
  );
};

export default HeroImage;
