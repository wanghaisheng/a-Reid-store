import { Container, Typography } from '@mui/material';
import { ArrowIcon, BottomText, StyledHeadLine, TopText } from './StyledHeadLine';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

const Headline = () => {
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  const TopTextVariants = {
    initial: {
      opacity: 0,
      y: '10rem',
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Container maxWidth='md'>
      <StyledHeadLine>
        <TopText>
          <Typography
            variant='h2'
            component={motion.h2}
            variants={TopTextVariants}
            initial='initial'
            animate='animate'
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {t('Headline1')}
          </Typography>
          <Typography
            variant='h2'
            component={motion.h2}
            variants={TopTextVariants}
            initial='initial'
            animate='animate'
            transition={{ duration: 0.5, delay: 1 }}
          >
            {t('Headline2')}
          </Typography>
        </TopText>
        <BottomText>
          <ArrowIcon
            initial={{
              opacity: 0,
              scale: 0,
              x: '-10rem',
            }}
            animate={{ opacity: 1, scale: 1, x: 0, rotateX: 180 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          <Typography
            variant='h1'
            component={motion.h1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {lang == 'ar'
              ? t('Headline3')
              : t('Headline3')
                  .split('')
                  .map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: '10rem' }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      style={{ display: 'inline-block' }}
                    >
                      {letter}
                    </motion.span>
                  ))}
          </Typography>
        </BottomText>
      </StyledHeadLine>
    </Container>
  );
};

export default Headline;
