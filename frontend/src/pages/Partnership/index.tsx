import { Card, Typography, styled } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import { partners } from './_data';

const Container = styled('div')(({ theme }) => ({
  '& .grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(auto-fill, 1fr)',
    gap: '16px',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },

    '& .gridItem': {
      padding: '3rem',
      height: '150px',
      borderRadius: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& img': { width: '100%' },
    },
  },
}));

const Partnership = () => {
  return (
    <PageContainer>
      <Container>
        <div className='text'>
          <Typography variant='h2' sx={{ color: 'white', marginBottom: '2rem' }}>
            Partners & Team
          </Typography>
          <Typography variant='h4' sx={{ color: 'white' }}>
            Collaborative Excellence:
            <br /> Building Bridges, Driving Success
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: 'white', maxWidth: '600px', margin: '4rem 0', lineHeight: '2.8rem' }}
          >
            Empowering partnerships and fostering teamwork to achieve unparalleled excellence. Our
            dedicated approach and shared vision create a synergy that fuels innovation and drives
            sustainable success for all.
          </Typography>
        </div>
        <div className='grid'>
          {partners.map((partner) => (
            <Card key={partner.id} className='gridItem' elevation={6}>
              <img src={partner.img} />
            </Card>
          ))}
        </div>
      </Container>
    </PageContainer>
  );
};

export default Partnership;
