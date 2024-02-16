import { Card, Typography, styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px',
  borderBottom: `2px solid white`,
  padding: '8rem 0',

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
    <Container>
      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
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
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p10.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p7.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p8.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p3.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p5.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p6.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p2.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p4.gif' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p9.png' />
          </Card>
          <Card className='gridItem' elevation={6}>
            <img src='./assets/p1.png' />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Partnership;
