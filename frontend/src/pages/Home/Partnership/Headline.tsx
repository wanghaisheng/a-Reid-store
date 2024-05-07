import { Typography, styled, useTheme } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

const StyledHeadline = styled('div')(({ theme }) => ({
  textAlign: 'center',

  '& .title': {
    maxWidth: '900px',
    margin: '2rem auto 6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%',
    '& img': {
      width: '75px',
      height: '75px',
      borderRadius: '50%',
      [theme.breakpoints.up('sm')]: { width: '85px', height: '85px' },
      [theme.breakpoints.up('md')]: { width: '100px', height: '100px' },
      [theme.breakpoints.up('lg')]: { width: 'auto', height: 'auto' },
    },
    '& .handsWord': { color: theme.palette.primary.dark },
  },
}));

const Headline = () => {
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);
  const theme = useTheme();

  return (
    <StyledHeadline>
      <Link to='/partnership'>
        <StyledButton
          sx={{
            bgcolor: 'white',
            color: 'black',
            '&:hover': {
              outline: '2px solid white',
              color: theme.palette.mode == 'dark' ? 'white' : 'auto',
            },
          }}
        >
          {t('BecomeAPartner')}
        </StyledButton>
      </Link>
      <div className='title'>
        <img src='/assets/home/shakeHands.png' />
        <Typography
          variant='h3'
          sx={{ textAlign: lang == 'ar' ? 'right' : 'left', color: 'primary.light' }}
        >
          {t('WE_ARE_EAGER_TO')}
          <br />
          {t('SHAKE_YOUR')} <span className='handsWord'>{t('HANDS')}</span>!
        </Typography>
      </div>
    </StyledHeadline>
  );
};

export default Headline;
