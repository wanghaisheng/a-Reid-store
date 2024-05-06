import { IconButton, InputBase, Typography, styled } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EastIcon from '@mui/icons-material/East';
import emailjs from '@emailjs/browser';
import { FormEvent, MutableRefObject, useContext, useRef } from 'react';
import { useAppDispatch } from '../../../app/store';
import { openToast } from '../../../app/features/toastSlice';
import Toast from '../../../components/Toasts/Toast';
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

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
  const form: MutableRefObject<HTMLFormElement> | undefined = useRef(undefined!);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm('contact_service', 'newsletter', form?.current, 'id3FMtC8zl1lcfPDr').then(
      (result) => {
        console.log(result.text);
        if (result.status == 200) {
          form.current.reset();
          dispatch(
            openToast({
              type: 'success',
              message: t('YouHaveSubscribedSuccessfully'),
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
              message: t('SomeErrorHappened'),
            })
          );
      }
    );
  };

  return (
    <Card>
      <div className='mailBox'>
        <img src='/assets/home/pattern.png' />
        <div className='mailForm'>
          <Typography variant='h2' sx={{ mb: '4rem', textAlign: lang == 'ar' ? 'right' : 'auto' }}>
            <span className='grayTxt'>{t('JoinThe')}</span> <br /> {t('Newsletter')}
            <span className='grayTxt'>!</span>
          </Typography>
          <form className='textField' ref={form} onSubmit={sendEmail}>
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
              required
              placeholder={t('YourEmailAddress')}
              type='email'
              name='user_email'
              inputProps={{ 'aria-label': 'Your E-mail Address' }}
            />
            <IconButton
              type='submit'
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
            <Toast />
          </form>
        </div>
      </div>
      <div className='cardImg'>
        <img src='/assets/home/standing.png' />
      </div>
    </Card>
  );
};

export default EmailCard;
