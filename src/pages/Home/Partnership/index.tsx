import { styled } from '@mui/material';
import Headline from './Headline';
import Cards from './Cards';

const Container = styled('div')({
  minHeight: '100vh',
  background: '#F3F0F7',
  padding: '8rem 0',

  '& .wrapper': {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
});

const Partnership = () => {
  return (
    <Container>
      <div className='wrapper'>
        <Headline />
        <Cards />
      </div>
    </Container>
  );
};

export default Partnership;
