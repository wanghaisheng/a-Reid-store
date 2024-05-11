import { Typography, styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';
import { motion } from 'framer-motion';

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
      <Link to='/partnership'>
        <StyledButton
          sx={(theme) => ({
            bgcolor: 'white',
            color: 'black',
            '&:hover': {
              outline: '2px solid white',
              color: theme.palette.mode == 'dark' ? 'white' : 'auto',
            },
          })}
          component={motion.button}
          initial={{
            opacity: 0,
            scaleX: 0,
            transformOrigin: 'left',
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('BecomeAPartner')}
        </StyledButton>
      </Link>
      <div className='title'>
        <motion.img
          src='/assets/home/shakeHands.png'
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <Typography
          variant='h3'
          sx={{ textAlign: lang == 'ar' ? 'right' : 'left', color: 'primary.light' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={titleVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('WE_ARE_EAGER_TO')}
          </motion.span>
          <br />
          <motion.span
            style={{ display: 'inline-block' }}
            variants={titleVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('SHAKE_YOUR')} <span className='handsWord'>{t('HANDS')}</span>!
          </motion.span>
        </Typography>
      </div>
    </StyledHeadline>
  );
};

export default Headline;
