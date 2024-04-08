import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Toast from '../../components/Toasts/Toast';
import { useAppDispatch } from '../../app/store';
import { openToast } from '../../app/features/toastSlice';
import useAuth from '../../hooks/useAuth';
import { TextField, Typography, styled } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import StyledButton from '../../components/Buttons/StyledButton';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export const StyledForm = styled('form')(({ theme }) => ({
  width: '350px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',

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
    a: {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.secondary.light,
      },
    },
  },
}));

const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { activeUser, registerUser, registerLoading, registerError } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (registerError) dispatch(openToast({ type: 'error', message: registerError.message }));
  }, [registerError, dispatch]);

  useEffect(() => {
    if (activeUser) navigate('/account', { replace: true });
  }, [activeUser, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(user);
  };

  if (registerLoading) return <p>Loading...</p>;

  return (
    <PageContainer style={{ paddingTop: '4rem', display: 'flex', alignItems: 'center' }}>
      <StyledForm onSubmit={handleSubmit}>
        <Typography
          variant='h5'
          sx={{ fontSize: '3rem !important', fontWeight: 'bold', color: 'white' }}
        >
          Sign Up
        </Typography>
        <TextField
          required
          id='outlined-required'
          label='Username'
          type='username'
          name='username'
          value={user.username}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
        <TextField
          required
          id='outlined-required'
          label='Email'
          type='email'
          name='email'
          value={user.email}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
        <TextField
          required
          id='outlined-required'
          label='Password'
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
          Sign Up
        </StyledButton>
        <span className='question'>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </StyledForm>
      <Toast />
    </PageContainer>
  );
};

export default SignUp;