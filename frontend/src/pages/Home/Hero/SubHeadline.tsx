import { Container, Typography, styled } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

const StyledSubHeadline = styled('div')(({ theme }) => ({
  color: 'white',
  maxWidth: '30rem',
  position: 'relative',
  top: '50vh',
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
  '@media (min-width: 1600px)': {
    right: '-45vw',
  },
  '@media (min-width: 1700px)': {
    right: '-40vw',
  },
  '@media (min-width: 1800px)': {
    right: '-35vw',
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
