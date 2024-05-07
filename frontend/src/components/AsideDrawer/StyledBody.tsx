import { styled } from '@mui/material';
import { useAppSelector } from '../../app/store';

const StyledBody = styled('div')(() => {
  const { activeDrawer } = useAppSelector((store) => store.drawer);
  return {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',

    '& .cartItem': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '3rem',

      '& .itemImg': {
        width: '60px',
        height: '80px',
        position: 'relative',
        '&:hover': {
          '& .removeProduct': { opacity: 1 },
        },

        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },

        '& .removeProduct': {
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
      },

      '& .cartDetails': {
        width: activeDrawer == 'wishlist' ? '130px' : 'auto',
      },
    },
  };
});

export default StyledBody;
