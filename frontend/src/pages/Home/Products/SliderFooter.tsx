import { styled } from '@mui/material';

const SliderFooter = styled('div')(({ theme }) => ({
  padding: '1rem 12rem',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  '@media (min-width: 768px)': {
    flexDirection: 'row-reverse',
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: '4rem',
  },

  '& .ProductDetailsButtons': {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '204px',
  },

  '& .ProductDetailsBtn': {
    color: 'black',
    background: theme.palette.secondary.main,
    textTransform: 'capitalize',
    fontSize: '1.5rem !important',
    fontWeight: 'bold',
    borderRadius: '50px',
    padding: '0.9rem 2.5rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },

  '& .ProductBagBtn': {
    background: 'white',
    color: 'black',
    padding: '1.4rem',
    marginRight: '1rem',
  },

  '& .SlideButtons': {
    minWidth: '170px',
    '& .ArrowBtn': {
      color: 'black',
      width: '100px',
      height: '50px',
      borderRadius: '50px',
      border: '2px solid white',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    '& .ArrowBtn.Circle': {
      width: '50px',
      margin: '0 1rem',
    },
  },
}));

export default SliderFooter;
