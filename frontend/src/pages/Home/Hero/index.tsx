import { Box, Container, Theme, styled, useMediaQuery } from '@mui/material';
import HeroNavLinks from './HeroNavLinks';
import HeroImage from './HeroImage';
import Headline from './Headline';
import SubHeadline from './SubHeadline';
import Thumbnails from './Thumbnails';

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    minHeight: '80vh',
  },
  [theme.breakpoints.up('lg')]: {
    alignItems: 'center',
  },
  '@media (min-width: 1400px)': {
    minHeight: '100vh',
  },
})) as typeof Box;

const Hero = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up(1024));

  return (
    <>
      <StyledBox>
        <Container maxWidth='lg'>
          {matches && <HeroNavLinks />}
          <HeroImage />
          <Headline />
          <SubHeadline />
        </Container>
      </StyledBox>
      <Thumbnails />
    </>
  );
};

export default Hero;
