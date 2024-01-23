import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.8rem',
  position: 'relative',
  whiteSpace: 'nowrap',
  '&::before, &::after': {
    position: 'absolute',
    width: '100%',
    height: '1px',
    background: theme.palette.secondary.main,
    top: '100%',
    left: 0,
    pointerEvents: 'none',
  },
  '&::before': {
    content: '""',
    transformOrigin: '50% 100%',
    transition: 'clip-path 0.3s, transform 0.3s cubic-bezier(0.2, 1, 0.8, 1)',
    clipPath:
      'polygon(0% 0%, 0% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 100% 100%, 100% 0%)',
  },
  '&:hover::before': {
    transform: 'translate3d(0, 2px, 0) scale3d(1.08, 3, 1)',
    clipPath:
      'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 50% 100%, 0 100%, 100% 100%, 100% 0%)',
  },
  '& span': {
    display: 'inline-block',
    transition: 'transform 0.3s cubic-bezier(0.2, 1, 0.8, 1)',
  },
  '&:hover span': {
    transform: 'translate3d(0, -2px, 0)',
  },
  '&.active': {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    '&::before, &::after': {
      background: theme.palette.secondary.main,
      transform: 'translate3d(0, 2px, 0) scale3d(1.08, 3, 1)',
      clipPath:
        'polygon(0% 0%, 0% 100%, 50% 100%, 50% 0, 50% 0, 50% 100%, 50% 100%, 0 100%, 100% 100%, 100% 0%)',
    },
    '& span': {
      transform: 'translate3d(0, -2px, 0)',
    },
  },
}));

export default StyledNavLink;
