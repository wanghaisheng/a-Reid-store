import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';
import StyledButton from '../../../components/Buttons/StyledButton';
import StyledNavButton from './StyledNavButton';

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
  return (
    <StyledContainer>
      <NavLink to='/'>
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
          Home
        </StyledButton>
      </NavLink>
      <NavLink to='/products'>
        <StyledNavButton zIndex={4} x={25} rotate={5}>
          Products
        </StyledNavButton>
      </NavLink>
      <NavLink to='/partnership'>
        <StyledNavButton zIndex={3} x={0} rotate={-3}>
          Partnership
        </StyledNavButton>
      </NavLink>
      <NavLink to='/about'>
        <StyledNavButton zIndex={2} x={25} rotate={-10}>
          About us
        </StyledNavButton>
      </NavLink>
      <NavLink to='/contact'>
        <StyledNavButton zIndex={1} x={0} rotate={3}>
          Contact us
        </StyledNavButton>
      </NavLink>
    </StyledContainer>
  );
};

export default HeroNavLinks;
