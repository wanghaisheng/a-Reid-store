import { Container, Typography } from '@mui/material';
import { ArrowIcon, BottomText, StyledHeadLine, TopText } from './StyledHeadLine';
import { useTranslation } from 'react-i18next';

const Headline = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth='md'>
      <StyledHeadLine>
        <TopText>
          <Typography variant='h2'>{t('Headline1')}</Typography>
          <Typography variant='h2'>{t('Headline2')}</Typography>
        </TopText>
        <BottomText>
          <ArrowIcon />
          <Typography variant='h1'>{t('Headline3')}.</Typography>
        </BottomText>
      </StyledHeadLine>
    </Container>
  );
};

export default Headline;
