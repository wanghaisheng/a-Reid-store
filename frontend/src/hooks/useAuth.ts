import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { LOGIN_USER, REGISTER_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const userData = Cookies.get('userData');
  let activeUser;
  if (userData) activeUser = JSON.parse(userData);

  const [register, { loading: registerLoading, error: registerError }] = useMutation(REGISTER_USER);
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const registerUser = async (user: { username: string; email: string; password: string }) => {
    try {
      const { data } = await register({ variables: user });
      if (data.register.jwt) {
        Cookies.set('userData', JSON.stringify(data.register), {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
        });
        navigate('/account', { replace: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const loginUser = async (user: { identifier: string; password: string }) => {
    try {
      const { data } = await login({ variables: user });
      if (data.login.jwt) {
        Cookies.set('userData', JSON.stringify(data.login), {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
        });
        navigate('/account', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return {
    activeUser,
    loginUser,
    loginLoading,
    loginError,
    registerUser,
    registerLoading,
    registerError,
  };
};

export default useAuth;
