import { Typography, styled } from '@mui/material';
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const StyledHeadline = styled('div')(({ theme }) => ({
  position: 'relative',
  alignSelf: 'center',

  '& .alarmIcon, .autoAwesome': {
    position: 'absolute',
    width: 40,
    height: 40,
    padding: '0.75rem',
    borderRadius: '100%',
    backgroundColor: 'rgba(219, 210, 228, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    [theme.breakpoints.up('sm')]: { width: 50, height: 50 },
    [theme.breakpoints.up('md')]: { width: 60, height: 60, padding: '1rem' },
  },

  '& .alarmIcon': {
    top: '3rem',
    [theme.breakpoints.up('sm')]: { left: '-2.5%' },
    [theme.breakpoints.up('md')]: { top: '2rem', left: '-6%' },
    [theme.breakpoints.up('lg')]: { top: '2.8rem' },
  },

  '& .autoAwesome': {
    bottom: '2rem',
    left: '65%',
    [theme.breakpoints.up('sm')]: { bottom: '3rem', left: '75%' },
    [theme.breakpoints.up('md')]: { bottom: '3.4rem', left: '73%' },
    [theme.breakpoints.up('lg')]: { left: '77%' },
  },

  '& .label': {
    color: 'white',
    background: theme.palette.primary.dark,
    padding: '1.6rem',
    width: '160px',
    borderRadius: '3.6rem',
    textAlign: 'center',
    lineHeight: 0,
    marginBottom: '-1rem',
    [theme.breakpoints.up('sm')]: { width: '180px', marginBottom: '-1rem' },
    [theme.breakpoints.up('md')]: { width: '190px', marginBottom: '-1.5rem' },
    [theme.breakpoints.up('lg')]: { width: '200px' },
  },

  '& .subTitle1': { margin: '0.8rem 0 0 4rem', color: 'white' },

  '& .subTitle2': {
    color: 'white',
    background: 'linear-gradient(to top, #FFFFFF 50%, #B598D2 75%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    marginTop: '-0.8rem',
    [theme.breakpoints.up('sm')]: { marginTop: '-1rem' },
    [theme.breakpoints.up('md')]: { marginTop: '-1.4rem' },
  },

  '& .title1': { color: 'white' },

  '& .title2': {
    color: 'white',
    background: 'linear-gradient(to top left, #FFFFFF 50%, #B598D2 100%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    marginTop: '-1.2rem',
    [theme.breakpoints.up('sm')]: { marginTop: '-1.5rem' },
    [theme.breakpoints.up('md')]: { marginTop: '-1.8rem' },
  },
}));

const Headline = () => {
  const { t } = useTranslation();

  const titleVariants = {
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
    <StyledHeadline>
      <AccessAlarmTwoToneIcon
        className='alarmIcon'
        sx={{ color: '#df3a3a' }}
        component={motion.svg}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <Typography
        variant='body1'
        className='label'
        component={motion.p}
        initial={{
          opacity: 0,
          scaleX: 0,
        }}
        whileInView={{
          opacity: 1,
          scaleX: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('WeWannaTellYouThat')}
      </Typography>
      <Typography
        variant='h3'
        className='subTitle1'
        component={motion.h3}
        variants={titleVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {t('ItIsTime')}
      </Typography>
      <Typography
        variant='h3'
        className='subTitle2'
        component={motion.h3}
        variants={titleVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t('toLove')}
      </Typography>
      <Typography
        variant='h2'
        className='title1'
        component={motion.h2}
        variants={titleVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {t('Your')}
      </Typography>
      <Typography
        variant='h2'
        className='title2'
        component={motion.h2}
        variants={titleVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {t('style')}!
      </Typography>
      <AutoAwesomeTwoToneIcon
        className='autoAwesome'
        sx={{ color: 'secondary.main' }}
        component={motion.svg}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </StyledHeadline>
  );
};

export default Headline;
