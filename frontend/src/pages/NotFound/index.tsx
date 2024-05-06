import { Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledButton from '../../components/Buttons/StyledButton';
import PageContainer from '../../components/PageContainer';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down(640));
  const { t } = useTranslation();

  return (
    <PageContainer>
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
            {t('Oops')}
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
            {t('NotFound')}
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
              {t('HomePage')}
            </StyledButton>
          </Link>
        </Grid>
        <Grid item xs={matches ? 12 : 6}>
          <img
            src={window.origin + '/assets/notFound/404.png'}
            alt='Not Found Image'
            style={{ maxWidth: matches ? 400 : 550 }}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NotFound;
