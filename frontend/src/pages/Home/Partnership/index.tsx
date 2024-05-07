import { styled } from '@mui/material';
import Headline from './Headline';
import Cards from './Cards';

export const Container = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.mode == 'light' ? '#F3F0F7' : '#09090B',
  padding: '8rem 0',
  color: 'black',

  '& .wrapper': {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
}));

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
