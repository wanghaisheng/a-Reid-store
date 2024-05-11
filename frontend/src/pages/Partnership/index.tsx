import { Card, Typography, styled } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import { partners } from './_data';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../contexts/locale/LocaleContext';
import { motion } from 'framer-motion';

const Container = styled('div')(({ theme }) => ({
  '& .grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(auto-fill, 1fr)',
    gap: '16px',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },

    '& .gridItem': {
      background: 'white',
      padding: '3rem',
      height: '150px',
      borderRadius: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& img': { width: '100%' },
    },
  },
}));

const Partnership = () => {
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

  const cardVariants = {
    initial: {
      opacity: 0,
      rotateY: 90,
    },
    animate: {
      opacity: 1,
      rotateY: 0,
    },
  };

  return (
    <PageContainer>
      <Container>
        <div className='text'>
          <Typography
            variant='h2'
            sx={{
              color: 'white',
              marginBottom: '2rem',
              textAlign: lang == 'ar' ? 'right' : 'auto',
            }}
            component={motion.h2}
            variants={titleVariants}
            initial='initial'
            animate='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('Partners&Team')}
          </Typography>
          <Typography
            variant='h4'
            sx={{ color: 'white', textAlign: lang == 'ar' ? 'right' : 'auto' }}
            component={motion.h4}
            variants={titleVariants}
            initial='initial'
            animate='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('CollaborativeExcellence')}
            <br /> {t('BuildingBridgesDrivingSuccess')}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              maxWidth: '600px',
              margin: '4rem 0',
              lineHeight: '2.8rem',
              textAlign: lang == 'ar' ? 'right' : 'auto',
            }}
            component={motion.p}
            variants={titleVariants}
            initial='initial'
            animate='animate'
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('EmpoweringPartnerships')}
          </Typography>
        </div>
        <div className='grid'>
          {partners.map((partner, index: number) => (
            <Card
              key={partner.id}
              className='gridItem'
              elevation={6}
              component={motion.div}
              variants={cardVariants}
              initial='initial'
              animate='animate'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={partner.img} />
            </Card>
          ))}
        </div>
      </Container>
    </PageContainer>
  );
};

export default Partnership;
