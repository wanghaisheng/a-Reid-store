import { TextField, Typography, styled } from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PageContainer from '../../components/PageContainer';

const Container = styled('div')(({ theme }) => ({
  '& .contact': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `2px solid white`,
    borderRadius: '20px',
    marginBottom: '8rem',
    padding: '4rem',
    gap: '4rem',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  },

  '& .formContainer': {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    '& form': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
      width: '100%',
      padding: '0 2rem',
      [theme.breakpoints.up('lg')]: {
        padding: '0 6rem',
      },

      '& .MuiFormLabel-root': {
        color: 'white',
      },

      '.MuiInputBase-input:focus': {
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'red !important',
        },
      },

      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },

      '& .submitBtn': {
        color: 'black',
        background: theme.palette.secondary.main,
        width: '100%',
        padding: '1rem 0',
        '&:hover': {
          background: theme.palette.secondary.light,
        },
      },
    },
  },

  '& .contactInfo': {
    width: '100%',
    color: 'white',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    '& .title': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      gap: '2rem',
    },

    '& .text': {
      marginLeft: '4.5rem',
      maxWidth: '250px',
    },
  },

  '& .map': {
    '& iframe': {
      width: '100%',
      height: '425px',
      border: `4px solid white`,
      borderRadius: '20px',
    },

    '& .mapBtn': {
      display: 'block',
      textAlign: 'center',

      '& button': {
        color: 'black',
        background: theme.palette.secondary.main,
        '&:hover': {
          background: theme.palette.secondary.light,
        },
      },
    },
  },
}));

const ContactUs = () => {
  return (
    <PageContainer>
      <Container>
        <div className='contact'>
          <div className='formContainer'>
            <form>
              <Typography
                variant='h5'
                sx={{ fontSize: '3rem !important', fontWeight: 'bold', color: 'white' }}
              >
                Send Us A Message
              </Typography>
              <TextField
                required
                id='outlined-required'
                label='Your Email Address'
                sx={{ width: '100%' }}
              />
              <TextField
                id='outlined-multiline-static'
                label='How Can We Help?'
                multiline
                rows={6}
                required
                sx={{ width: '100%' }}
              />
              <StyledButton
                type='submit'
                className='submitBtn'
                component={motion.button}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </StyledButton>
            </form>
          </div>
          <div className='contactInfo'>
            <div className='address'>
              <div className='title'>
                <LocationOnOutlinedIcon />
                <p>Address</p>
              </div>
              <p className='text'>
                Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
              </p>
            </div>
            <div className='talk'>
              <div className='title'>
                <LocalPhoneOutlinedIcon />
                <p>Lets Talk</p>
              </div>
              <p className='text'>+1 800 1236879</p>
            </div>
            <div className='support'>
              <div className='title'>
                <EmailOutlinedIcon />
                <p>Sale Support</p>
              </div>
              <p className='text'>contact@example.com</p>
            </div>
          </div>
        </div>
        <div className='map'>
          <iframe src='https://www.openstreetmap.org/export/embed.html?bbox=30.86746215820313%2C29.685666670118724%2C31.91940307617188%2C30.38235321766959&amp;layer=mapnik'></iframe>
          <br />
          <small className='mapBtn'>
            <a href='https://www.openstreetmap.org/#map=10/30.0346/31.3934' target='_blank'>
              <StyledButton>View Larger Map</StyledButton>
            </a>
          </small>
        </div>
      </Container>
    </PageContainer>
  );
};

export default ContactUs;
