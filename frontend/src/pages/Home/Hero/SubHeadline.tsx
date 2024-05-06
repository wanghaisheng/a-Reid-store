import { Container, Typography, styled } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

const StyledSubHeadline = styled('div')(({ theme }) => ({
  color: 'white',
  maxWidth: '30rem',
  position: 'relative',
  top: '53vh',
  [theme.breakpoints.up('sm')]: {
    top: '47vh',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '25rem',
    top: '-5vh',
    right: '-60vw',
  },
  '@media (min-width: 1024px)': {
    maxWidth: '30rem',
    top: '-40vh',
    right: '-57vw',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '33rem',
    right: '-48vw',
  },
}));

const SubHeadline = () => {
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  return (
    <Container maxWidth='md'>
      <StyledSubHeadline>
        <Typography variant='body1' sx={{ textAlign: lang == 'ar' ? 'right' : 'auto' }}>
          {t('SubHeadline')}
        </Typography>
      </StyledSubHeadline>
    </Container>
  );
};

export default SubHeadline;
