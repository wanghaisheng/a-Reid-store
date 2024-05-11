import { styled } from '@mui/material';

const StyledSpinner = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .dots': {
    width: '13.4px',
    height: '13.4px',
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    boxShadow: '0 0 0 3.4px',
    position: 'relative',
    animation: 'animateInnerDots 2s infinite linear',
  },

  '& .dots:before, & .dots:after': {
    content: '""',
    position: 'absolute',
    borderRadius: ' 50%',
    inset: 0,
    background: theme.palette.secondary.main,
    transform: 'rotate(0deg) translate(20.2px)',
    animation: 'animateOuterDots 1s infinite',
  },

  '& .dots:after': { animationDelay: '-0.5s' },

  '@keyframes animateInnerDots': {
    '100%': {
      transform: 'rotate(1turn)',
    },
  },

  '@keyframes animateOuterDots': {
    '100%': {
      transform: 'rotate(1turn) translate(22.4px)',
    },
  },
}));

export const Spinner = ({ place }: { place?: string }) => {
  let height = 100;
  if (place == 'productsSlider') height = 50;
  if (place == 'productsPage') height = 60;

  return (
    <StyledSpinner
      style={{
        height: `${height}vh`,
      }}
    >
      <div className='dots'></div>
    </StyledSpinner>
  );
};
