import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import StyledNavButton from './StyledNavButton';
import { useTranslation } from 'react-i18next';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 150,
  margin: '0 3rem',
  position: 'relative',
  top: '5rem',
});

const HeroNavLinks = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <Link to='/'>
        <StyledButton
          sx={{
            width: 150,
            color: 'primary.main',
            bgcolor: 'white',
            fontSize: '1.7rem !important',
            fontWeight: 'normal',
            zIndex: 5,
            '&:hover': { color: 'primary.main', bgcolor: 'white' },
          }}
          variant='contained'
        >
          {t('Home')}
        </StyledButton>
      </Link>
      <Link to='/products'>
        <StyledNavButton zIndex={4} x={25} rotate={5}>
          {t('Products')}
        </StyledNavButton>
      </Link>
      <Link to='/partnership'>
        <StyledNavButton zIndex={3} x={0} rotate={-3}>
          {t('Partnership')}
        </StyledNavButton>
      </Link>
      <Link to='/about'>
        <StyledNavButton zIndex={2} x={25} rotate={-10}>
          {t('AboutUs')}
        </StyledNavButton>
      </Link>
      <Link to='/contact'>
        <StyledNavButton zIndex={1} x={0} rotate={3}>
          {t('ContactUs')}
        </StyledNavButton>
      </Link>
    </StyledContainer>
  );
};

export default HeroNavLinks;
