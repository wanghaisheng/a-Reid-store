import { Card, CardMedia, Typography, styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px',
  borderBottom: `2px solid white`,
  padding: '8rem 0',

  '& .section': {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: '3rem',
    },

    '&:last-child': {
      marginTop: '8rem',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse',
      },
    },

    '& .sectionText': {
      [theme.breakpoints.up('md')]: { width: '50%' },
    },

    '& .sectionImg': {
      width: '80%',
      padding: '2rem',
      borderRadius: '2rem',
      [theme.breakpoints.up('sm')]: { width: '60%' },
      [theme.breakpoints.up('md')]: { width: '355px', height: '355px' },
      [theme.breakpoints.up('lg')]: { width: '460px', height: '460px' },

      '& img': { width: '100%', objectFit: 'fill' },
    },
  },
}));

const AboutUs = () => {
  return (
    <Container>
      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
        <div className='section'>
          <div className='sectionText'>
            <Typography variant='h2' sx={{ color: 'white', marginBottom: '2rem' }}>
              Our Story
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: 'white', maxWidth: '600px', margin: '4rem 0', lineHeight: '2.8rem' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat
              enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus,
              sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque
              congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat
              bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt
              vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod
              tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
            </Typography>
          </div>
          <Card className='sectionImg' elevation={6}>
            <CardMedia component='img' image='./assets/about-01.jpg' />
          </Card>
        </div>
        <div className='section'>
          <div className='sectionText'>
            <Typography variant='h2' sx={{ color: 'white', marginBottom: '2rem' }}>
              Our Mission
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: 'white', maxWidth: '600px', margin: '4rem 0', lineHeight: '2.8rem' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat
              enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus,
              sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque
              congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat
              bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt
              vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod
              tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
            </Typography>
          </div>
          <Card className='sectionImg' elevation={6}>
            <CardMedia component='img' image='./assets/about-02.jpg' />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
