import { Theme, styled, useMediaQuery } from '@mui/material';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../../contexts/locale/LocaleContext';

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

  return (
    <Container>
      <div className='card' style={lang == 'ar' ? { textAlign: 'right' } : {}}>
        <div className='icon'>
          <Face4OutlinedIcon />
        </div>
        <p className='text'>
          {t('Communicate')} {matches && <br />}
          {t('WithSupporters')}
        </p>
      </div>
      <div className='card' style={lang == 'ar' ? { textAlign: 'right' } : {}}>
        <div className='icon'>
          <FavoriteBorderOutlinedIcon />
        </div>
        <p className='text'>
          {t('EnteringTheCommunityOfThe')}
          {matches && <br />} {t('FashionedPeople')}
        </p>
      </div>
      <div className='card' style={lang == 'ar' ? { textAlign: 'right' } : {}}>
        <div className='icon'>
          <TipsAndUpdatesOutlinedIcon />
        </div>
        <p className='text'>
          {t('InformationAboutTheLatest')} {matches && <br />}
          {t('AchievementsIdeas&products')}
        </p>
      </div>
    </Container>
  );
};

export default WhiteCards;
