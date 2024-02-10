import { Container } from '../Partnership';
import EmailCard from './EmailCard';
import WhiteCards from './WhiteCards';

const Newsletter = () => {
  return (
    <Container style={{ background: 'white' }}>
      <div className='wrapper'>
        <EmailCard />
        <WhiteCards />
      </div>
    </Container>
  );
};

export default Newsletter;
