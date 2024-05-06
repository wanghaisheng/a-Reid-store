import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import { StyledForm } from '../SignUp';
import PageContainer from '../../components/PageContainer';
import { Spinner } from '../../components/Spinners';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [user, setUser] = useState({
    identifier: '',
    password: '',
  });
  const { activeUser, loginUser, loginLoading, loginError } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (loginError) dispatch(openToast({ type: 'error', message: loginError.message }));
  }, [loginError, dispatch]);

  useEffect(() => {
    if (activeUser) navigate('/account', { replace: true });
  }, [activeUser, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(user);
  };

  if (loginLoading) return <Spinner />;

  return (
    <PageContainer style={{ paddingTop: '4rem', display: 'flex', alignItems: 'center' }}>
      <StyledForm onSubmit={handleSubmit}>
        <Typography
          variant='h5'
          sx={{ fontSize: '3rem !important', fontWeight: 'bold', color: 'white' }}
        >
          {t('Login')}
        </Typography>
        <TextField
          required
          id='outlined-required'
          label={t('Email')}
          type='email'
          name='identifier'
          value={user.identifier}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
        <TextField
          required
          id='outlined-required'
          label={t('Password')}
          type='password'
          name='password'
          value={user.password}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
        <StyledButton
          type='submit'
          className='submitBtn'
          component={motion.button}
          whileTap={{ scale: 0.95 }}
        >
          {t('Login')}
        </StyledButton>
        <span className='question'>
          {t('DoNotHaveAnAccount')} <Link to='/sign-up'>{t('SignUp')}</Link>
        </span>
      </StyledForm>
      <Toast />
    </PageContainer>
  );
};

export default Login;
