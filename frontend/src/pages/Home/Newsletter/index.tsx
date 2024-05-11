import { useTheme } from '@mui/material';
import { Container } from '../Partnership';
import EmailCard from './EmailCard';
import WhiteCards from './WhiteCards';

const Newsletter = () => {
  const theme = useTheme();

  return (
    <Container
      style={{
        background: theme.palette.mode == 'light' ? 'white' : '#2F1C40',
        color: theme.palette.mode == 'light' ? 'black' : 'white',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
      initial={{
        opacity: 0,
        y: '25rem',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className='wrapper'>
        <EmailCard />
        <WhiteCards />
      </div>
    </Container>
  );
};

export default Newsletter;
