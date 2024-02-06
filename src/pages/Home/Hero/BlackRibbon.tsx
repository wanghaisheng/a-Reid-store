import { styled } from '@mui/material';
import Logo from '../../../assets/siteLogo2.png';

const StyledBlackRibbon = styled('div')(({ theme }) => ({
  height: 0,
  '& .skewed': {
    backgroundColor: 'black',
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center',
    backgroundSize: '14%',
    padding: '1.7rem',
    position: 'relative',
    bottom: '0rem',
    transform: 'skewY(-4deg)',
    transformOrigin: 'top left',
    zIndex: 2,
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '9%',
    },
    [theme.breakpoints.up('lg')]: {
      backgroundSize: '6.7%',
    },
  },
  '&::after': {
    content: '""',
    display: 'block',
    paddingBottom: '12vh',
    background: theme.palette.gray.main,
    position: 'relative',
    bottom: '5vh',
    transform: 'skewY(-4deg)',
    [theme.breakpoints.up('sm')]: {
      bottom: '7vh',
    },
    [theme.breakpoints.up('md')]: {
      bottom: '9vh',
    },
  },
}));

const BlackRibbon = () => {
  return (
    <StyledBlackRibbon>
      <div className='skewed'></div>
    </StyledBlackRibbon>
  );
};

export default BlackRibbon;
