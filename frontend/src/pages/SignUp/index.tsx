import { FormEvent, useEffect, useRef } from 'react';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import useAuth from '../../hooks/useAuth';
import { TextField, Typography, styled } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinners';
import { useTranslation } from 'react-i18next';

export const StyledForm = styled('form')(({ theme }) => ({
  width: '320px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  [theme.breakpoints.up('sm')]: {
    width: '350px',
  },

  '& .MuiFormLabel-root, & label.Mui-focused': {
    color: 'white',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
      borderColor: 'white',
    },
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

  '& .question': {
    color: 'white',
    display: 'inline-block',
    a: {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.secondary.light,
      },
    },
  },
}));

// eslint-disable-next-line react-refresh/only-export-components
export const titleVariants = {
  initial: {
    opacity: 0,
    y: '10rem',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(undefined!);
  const emailRef = useRef<HTMLInputElement>(undefined!);
  const passwordRef = useRef<HTMLInputElement>(undefined!);
  const { activeUser, registerUser, registerLoading, registerError } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const MotionTextField = motion(TextField);

  useEffect(() => {
    if (registerError) dispatch(openToast({ type: 'error', message: registerError.message }));
  }, [registerError, dispatch]);

  useEffect(() => {
    if (activeUser) navigate('/account', { replace: true });
  }, [activeUser, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    registerUser(user);
  };

  if (registerLoading) return <Spinner />;

  return (
    <PageContainer style={{ paddingTop: '4rem', display: 'flex', alignItems: 'center' }}>
      <StyledForm onSubmit={handleSubmit}>
        <Typography
          variant='h5'
          sx={{ fontSize: '3rem !important', fontWeight: 'bold', color: 'white' }}
          component={motion.h5}
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('SignUp')}
        </Typography>
        <MotionTextField
          required
          id='outlined-required'
          label={t('Username')}
          type='username'
          name='username'
          inputRef={usernameRef}
          sx={{ width: '100%' }}
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <MotionTextField
          required
          id='outlined-required'
          label={t('Email')}
          type='email'
          name='email'
          inputRef={emailRef}
          sx={{ width: '100%' }}
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <MotionTextField
          required
          id='outlined-required'
          label={t('Password')}
          type='password'
          name='password'
          inputRef={passwordRef}
          sx={{ width: '100%' }}
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <StyledButton
          type='submit'
          className='submitBtn'
          component={motion.button}
          whileTap={{ scale: 0.95 }}
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('SignUp')}
        </StyledButton>
        <motion.span
          className='question'
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t('AlreadyHaveAnAccount')} <Link to='/login'>{t('Login')}</Link>
        </motion.span>
      </StyledForm>
      <Toast />
    </PageContainer>
  );
};

export default SignUp;
