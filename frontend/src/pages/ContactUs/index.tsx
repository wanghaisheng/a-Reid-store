import { TextField, Typography } from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PageContainer from '../../components/PageContainer';
import emailjs from '@emailjs/browser';
import { FormEvent, MutableRefObject, useRef } from 'react';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import StyledContactPage from './StyledContactPage';

const ContactUs = () => {
  const form: MutableRefObject<HTMLFormElement> | undefined = useRef(undefined!);
  const dispatch = useAppDispatch();

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm('contact_service', 'contact_form', form?.current, 'id3FMtC8zl1lcfPDr').then(
      (result) => {
        console.log(result.text);
        if (result.status == 200) {
          form.current.reset();
          dispatch(
            openToast({
              type: 'success',
              message: 'Your message sent successfully!',
            })
          );
        }
      },
      (error) => {
        console.log(error.text);
        if (error)
          dispatch(
            openToast({
              type: 'error',
              message: 'Some error happened!',
            })
          );
      }
    );
  };

  return (
    <PageContainer>
      <StyledContactPage>
        <div className='contact'>
          <div className='formContainer'>
            <form ref={form} onSubmit={sendEmail}>
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
                type='email'
                name='user_email'
                sx={{ width: '100%' }}
              />
              <TextField
                id='outlined-multiline-static'
                label='How Can We Help?'
                type='text'
                name='user_message'
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
        <Toast />
      </StyledContactPage>
    </PageContainer>
  );
};

export default ContactUs;
