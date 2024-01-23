import { Container, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../assets/404.png';
import StyledButton from '../../components/Buttons/StyledButton';

const NotFound = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down(640));
  const theme = useTheme();

  return (
    <Container
      maxWidth='md'
      sx={{
        height: `calc(100vh - ${+theme.mixins.toolbar.minHeight!}px)`,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: matches ? 'column-reverse' : 'row',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={matches ? 12 : 6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h1' sx={{ color: 'white' }}>
            Oops!
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              textAlign: 'center',
              m: '2rem 0',
              width: matches ? '75%' : '100%',
              fontSize: matches ? '1.8rem' : 'inherit',
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </Typography>
          <Link to='/'>
            <StyledButton
              sx={{
                color: 'black',
                bgcolor: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.light',
                },
              }}
            >
              Home Page
            </StyledButton>
          </Link>
        </Grid>
        <Grid item xs={matches ? 12 : 6}>
          <img
            src={NotFoundImage}
            alt='Not Found Image'
            style={{ maxWidth: matches ? 400 : 550 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
