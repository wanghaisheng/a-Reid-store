import { useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const MyAccount = () => {
  const { activeUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) navigate('/login', { replace: true });
  }, [activeUser, navigate]);

  const handleLogout = () => {
    Cookies.remove('userData');
    navigate('/', { replace: true });
  };

  return (
    <PageContainer>
      {activeUser && activeUser?.user.username}
      <button onClick={handleLogout}>Logout</button>
    </PageContainer>
  );
};

export default MyAccount;
