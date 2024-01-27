import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';
import { motion } from 'framer-motion';
import StyledButton from '../../../components/Buttons/StyledButton';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 150,
  margin: '0 3rem',
  position: 'relative',
  top: '5rem',
});

type StyledNavButtonProps = {
  children: string | React.ReactNode;
  zIndex: number;
  x: number;
  rotate: number;
};

const StyledNavButton = ({ children, zIndex, x = 0, rotate }: StyledNavButtonProps) => {
  return (
    <StyledButton
      sx={{
        width: 150,
        color: 'white',
        fontSize: '1.7rem !important',
        fontWeight: 'normal',
        zIndex: zIndex,
        '&:hover': { color: 'primary.main', bgcolor: 'white' },
      }}
      variant='contained'
      component={motion.button}
      initial={{
        x: x,
        rotate: rotate,
        backgroundImage: 'linear-gradient(120deg, #b598d2 0%, #c4addb 100%)',
      }}
      whileHover={{
        rotate: 0,
        backgroundImage: 'linear-gradient(0deg, #fff 100%, #fff 100%)',
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </StyledButton>
  );
};

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
