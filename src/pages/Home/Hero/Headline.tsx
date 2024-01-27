import { Container, Typography, styled } from '@mui/material';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';

const StyledHeadLine = styled('div')(({ theme }) => ({
  position: 'relative',
  top: '50vh',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1024px)': {
    top: '4vh',
  },
  [theme.breakpoints.up('lg')]: {
    top: '13vh',
    left: '-7vw',
  },
}));

const ArrowIcon = styled(ShortcutOutlinedIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '5rem',
  transform: 'rotateX(180deg)',
  [theme.breakpoints.up('sm')]: {
    fontSize: '10rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15rem',
  },
}));

const TopText = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  '& h2:nth-of-type(2)': {
    background: '#E6E6E6',
    backgroundImage: 'linear-gradient(to bottom right, #E6E6E6 39%, #FFFFFF 50%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    textShadow:
      '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      top: '-1.5rem',
    },
  },
}));

const BottomText = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '20%',
    position: 'relative',
    top: '-2rem',
  },
  [theme.breakpoints.up('md')]: {
    top: '-3rem',
  },
  [theme.breakpoints.up('lg')]: {
    gap: '2rem',
    '& h1': {
      fontSize: '12rem',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& h1': {
      fontSize: '13rem',
    },
  },
}));

const Headline = () => {
  return (
    <Container maxWidth='md'>
      <StyledHeadLine>
        <TopText>
          <Typography variant='h2'>We Make</Typography>
          <Typography variant='h2'>Your Style</Typography>
        </TopText>
        <BottomText>
          <ArrowIcon />
          <Typography variant='h1'>Elegant.</Typography>
        </BottomText>
      </StyledHeadLine>
    </Container>
  );
};

export default Headline;
