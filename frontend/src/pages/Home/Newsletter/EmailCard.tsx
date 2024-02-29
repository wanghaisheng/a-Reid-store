import { IconButton, InputBase, Typography, styled } from '@mui/material';
import backImg from '../../../assets/Honeycomb-Pattern-PNG-Clipart.png';
import backImg3 from '../../../assets/standing.png';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EastIcon from '@mui/icons-material/East';

const Card = styled('div')(({ theme }) => ({
  background: '#E9E8E6',
  borderRadius: '50px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 10rem 0 10rem',
  [theme.breakpoints.up(768)]: {
    width: '70%',
    margin: '0 auto',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 0 0 10rem',
    width: '100%',
    margin: 'auto',
  },

  '& .mailBox': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',

    '& img': {
      width: ' 430px',
      height: '430px',
      opacity: 0.3,
      boxShadow: ' 0 0 60rem 60rem #E9E8E6 outset',
      borderRadius: '50%',
      [theme.breakpoints.up('md')]: { marginLeft: '-4rem' },
    },

    '& .mailForm': {
      position: 'absolute',
      '& .grayTxt': { color: '#878785' },
      '& .textField': {
        background: 'white',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem',
        borderRadius: '32px',
      },
    },
  },

  '& .cardImg': {
    maxWidth: '100%',
    display: 'flex',
    [theme.breakpoints.up('md')]: { maxWidth: '50%' },
    justifyContent: 'center',
    '& img': {
      maxWidth: '85%',
      transform: 'scale(1.1)',
      [theme.breakpoints.up('md')]: { maxWidth: '60%' },
    },
  },
}));

const EmailCard = () => {
  return (
    <Card>
      <div className='mailBox'>
        <img src={backImg} />
        <div className='mailForm'>
          <Typography variant='h2' sx={{ mb: '4rem' }}>
            <span className='grayTxt'>Join the</span> <br /> Newsletter
            <span className='grayTxt'>!</span>
          </Typography>
          <div className='textField'>
            <IconButton
              disableRipple
              sx={{
                ml: 1,
                p: '10px',
                color: 'black',
                bgcolor: 'white',
                '&:hover': { bgcolor: 'unset' },
                cursor: 'auto',
              }}
              aria-label='mail'
            >
              <EmailOutlinedIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, background: 'white', width: '70%', mr: '10px' }}
              placeholder='Your E-mail Address'
              inputProps={{ 'aria-label': 'Your E-mail Address' }}
            />
            <IconButton
              type='button'
              sx={{
                p: '10px',
                color: 'black',
                bgcolor: 'secondary.main',
                '&:hover': { bgcolor: 'secondary.light' },
              }}
              aria-label='send'
            >
              <EastIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className='cardImg'>
        <img src={backImg3} />
      </div>
    </Card>
  );
};

export default EmailCard;
