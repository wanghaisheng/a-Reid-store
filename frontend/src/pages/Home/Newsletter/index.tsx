import { Container } from '../Partnership';
import EmailCard from './EmailCard';
import WhiteCards from './WhiteCards';

const Newsletter = () => {
  return (
    <Container
      style={{
        background: 'white',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
      }}
    >
      <div className='wrapper'>
        <EmailCard />
        <WhiteCards />
      </div>
    </Container>
  );
};

export default Newsletter;
