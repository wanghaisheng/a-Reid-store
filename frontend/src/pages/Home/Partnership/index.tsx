import { styled } from '@mui/material';
import Headline from './Headline';
import Cards from './Cards';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)(({ theme }) => ({
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
    <Container
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
        <Headline />
        <Cards />
      </div>
    </Container>
  );
};

export default Partnership;
