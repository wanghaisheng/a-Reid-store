import { styled } from '@mui/material';
import Slider from 'react-slick';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '.slick-track': {
    padding: '3rem 0',
  },
  '.slick-dots li': {
    pointerEvents: 'none',
    cursor: 'default',
  },
  '.slick-dots li button::before': {
    color: theme.palette.mode == 'light' ? 'black' : 'white',
  },
  '& .slick-slide': {
    maxWidth: '252px',
    margin: '0 auto',
    padding: '0 1rem',
    cursor: 'pointer',
    '&:not(.slick-active)': {
      visibility: 'hidden',
    },
    '&:not(.slick-current)': {
      '.CardText': { display: 'none' },
    },
    '&.slick-current img': {
      filter: 'unset',
    },
    [theme.breakpoints.up('lg')]: {
      '&.slick-active': {
        transform: 'rotate(350deg) translate(0px, 80px)',
        zIndex: 2,
      },
      '&.slick-active + .slick-active': {
        transform: 'rotate(355deg) translate(0px, 20px)',
      },
      '&.slick-active.slick-current': {
        transform: 'none',
      },
      '&.slick-current + .slick-active': {
        transform: 'rotate(-355deg) translate(0px, 20px)',
      },
      '&.slick-current + .slick-active + .slick-active': {
        transform: 'rotate(-350deg) translate(0px, 80px)',
      },
    },
  },
}));

export default StyledSlider;
