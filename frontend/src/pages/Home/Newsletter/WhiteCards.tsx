import { Theme, styled, useMediaQuery } from '@mui/material';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';
import { motion } from 'framer-motion';

const Container = styled('div')(({ theme }) => ({
  margin: '2rem auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  [theme.breakpoints.up(700)]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1rem',
  },

  '& .card': {
    border: `2px solid ${theme.palette.gray.main}`,
    borderRadius: '50px',
    padding: '4rem',
    [theme.breakpoints.up(700)]: {
      width: 'calc(33.33% - 1rem)',
    },

    '& .icon .MuiSvgIcon-root': {
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
    },

    '& .text': {
      fontWeight: 'bold',
      [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
      },
    },
  },
}));

const WhiteCards = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  const animationVariants = {
    initial: {
      opacity: 0,
      y: '5rem',
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container>
      <div className='card' style={lang == 'ar' ? { textAlign: 'right' } : {}}>
        <div className='icon'>
          <Face4OutlinedIcon />
        </div>
        <p className='text'>
          <motion.span
            style={{ display: 'inline-block' }}
            initial='initial'
            variants={animationVariants}
            whileInView='animate'
            viewport={{ once: true }}
          >
            {t('Communicate')}
          </motion.span>
          {matches && <br />}
          <motion.span
            style={{ display: 'inline-block' }}
            initial='initial'
            variants={animationVariants}
            whileInView='animate'
            viewport={{ once: true }}
          >
            {t('WithSupporters')}
          </motion.span>
        </p>
      </div>
      <div className='card' style={lang == 'ar' ? { textAlign: 'right' } : {}}>
        <div className='icon'>
          <FavoriteBorderOutlinedIcon />
        </div>
        <p className='text'>
          <motion.span
            style={{ display: 'inline-block' }}
            initial='initial'
            variants={animationVariants}
            whileInView='animate'
            viewport={{ once: true }}
          >
            {t('EnteringTheCommunityOfThe')}
          </motion.span>
          {matches && <br />}
          <motion.span
            style={{ display: 'inline-block' }}
            initial='initial'
            variants={animationVariants}
            whileInView='animate'
            viewport={{ once: true }}
          >
            {t('FashionedPeople')}
          </motion.span>
        </p>
      </div>
      <div className='card' style={lang == 'ar' ? { textAlign: 'right' } : {}}>
        <div className='icon'>
          <TipsAndUpdatesOutlinedIcon />
        </div>
        <p className='text'>
          <motion.span
            style={{ display: 'inline-block' }}
            initial='initial'
            variants={animationVariants}
            whileInView='animate'
            viewport={{ once: true }}
          >
            {t('InformationAboutTheLatest')}
          </motion.span>
          {matches && <br />}
          <motion.span
            style={{ display: 'inline-block' }}
            initial='initial'
            variants={animationVariants}
            whileInView='animate'
            viewport={{ once: true }}
          >
            {t('AchievementsIdeas&products')}
          </motion.span>
        </p>
      </div>
    </Container>
  );
};

export default WhiteCards;
