import { FormEvent, useEffect, useRef } from 'react';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import { StyledForm, titleVariants } from '../SignUp';
import PageContainer from '../../components/PageContainer';
import { Spinner } from '../../components/Spinners';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(undefined!);
  const passwordRef = useRef<HTMLInputElement>(undefined!);
  const { activeUser, loginUser, loginLoading, loginError } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const MotionTextField = motion(TextField);

  useEffect(() => {
    if (loginError) dispatch(openToast({ type: 'error', message: loginError.message }));
  }, [loginError, dispatch]);

  useEffect(() => {
    if (activeUser) navigate('/account', { replace: true });
  }, [activeUser, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      identifier: emailRef.current.value,
      password: passwordRef.current.value,
    };
    loginUser(user);
  };

  if (loginLoading) return <Spinner />;

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
          {t('Login')}
        </Typography>
        <MotionTextField
          required
          id='outlined-required'
          label={t('Email')}
          type='email'
          name='identifier'
          inputRef={emailRef}
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
          label={t('Password')}
          type='password'
          name='password'
          inputRef={passwordRef}
          sx={{ width: '100%' }}
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('Login')}
        </StyledButton>
        <motion.span
          className='question'
          variants={titleVariants}
          initial='initial'
          animate='animate'
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('DoNotHaveAnAccount')} <Link to='/sign-up'>{t('SignUp')}</Link>
        </motion.span>
      </StyledForm>
      <Toast />
    </PageContainer>
  );
};

export default Login;
