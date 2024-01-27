import { Container, Typography, styled } from '@mui/material';

const StyledSubHeadline = styled('div')(({ theme }) => ({
  color: 'white',
  maxWidth: '30rem',
  position: 'relative',
  top: '53vh',
  [theme.breakpoints.up('sm')]: {
    top: '47vh',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '25rem',
    top: '-5vh',
    right: '-60vw',
  },
  '@media (min-width: 1024px)': {
    maxWidth: '30rem',
    top: '-40vh',
    right: '-57vw',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '33rem',
    right: '-48vw',
  },
}));

const SubHeadline = () => {
  return (
    <Container maxWidth='md'>
      <StyledSubHeadline>
        <Typography variant='body1'>
          Unveil Your Inner Expression Through Our Diverse Collection of Timeless Styles and Unique
          Fashion Discoveries
        </Typography>
      </StyledSubHeadline>
    </Container>
  );
};

export default SubHeadline;
