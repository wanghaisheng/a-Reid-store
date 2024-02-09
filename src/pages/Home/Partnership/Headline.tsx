import { Typography, styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import shakeHands from '../../../assets/shakeHands.png';
import { Link } from 'react-router-dom';

const StyledHeadline = styled('div')(({ theme }) => ({
  textAlign: 'center',

  '& .title': {
    maxWidth: '900px',
    margin: '2rem auto 6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%',
    '& img': {
      width: '75px',
      height: '75px',
      [theme.breakpoints.up('sm')]: { width: '85px', height: '85px' },
      [theme.breakpoints.up('md')]: { width: '100px', height: '100px' },
      [theme.breakpoints.up('lg')]: { width: 'auto', height: 'auto' },
    },
    '& .handsWord': { color: theme.palette.primary.dark },
  },
}));

const Headline = () => {
  return (
    <StyledHeadline>
      <Link to='/partnership'>
        <StyledButton
          sx={{
            bgcolor: 'white',
            color: 'black',
            '&:hover': { outline: '2px solid white' },
          }}
        >
          Become A Partner
        </StyledButton>
      </Link>
      <div className='title'>
        <img src={shakeHands} />
        <Typography variant='h3' sx={{ textAlign: 'left', color: 'primary.light' }}>
          WE ARE EAGER TO
          <br />
          SHAKE YOUR <span className='handsWord'>HANDS</span>!
        </Typography>
      </div>
    </StyledHeadline>
  );
};

export default Headline;
