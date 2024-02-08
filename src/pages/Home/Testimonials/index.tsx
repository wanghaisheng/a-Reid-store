import { Container, styled } from '@mui/material';
import Headline from './Headline';
import TestimonialsSlider from './TestimonialsSlider';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  overflow: 'hidden',
  paddingTop: '10rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4rem',
  [theme.breakpoints.up('md')]: {
    paddingTop: '7rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: '8rem',
    alignItems: 'unset',
  },
}));

const Testimonials = () => {
  return (
    <StyledContainer maxWidth='md'>
      <Headline />
      <TestimonialsSlider />
    </StyledContainer>
  );
};

export default Testimonials;
