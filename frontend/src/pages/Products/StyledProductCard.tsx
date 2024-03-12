import { styled } from '@mui/material';

const StyledProductCard = styled('div')({
  height: '400px',
  width: '275px',
  color: 'white',

  '& .picture': {
    height: '335px',
    borderRadius: '1.5rem',
    border: '2px solid rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.4s ease',
    },

    '& .quickView': {
      textAlign: 'center',
      visibility: 'hidden',
      opacity: 0,
      transition: 'all 0.4s ease',
    },

    '&:hover': {
      '& img': {
        transform: 'scale(1.1)',
      },
      '& .quickView': {
        visibility: 'visible',
        opacity: 1,
        transform: 'translate(0, -6rem)',
      },
    },
  },

  '& .footer': {
    height: '65px',

    '& .title': {
      padding: '1rem 0 0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      '& a': {
        color: 'white',
        textDecoration: 'none',
      },
    },
  },
});

export default StyledProductCard;
