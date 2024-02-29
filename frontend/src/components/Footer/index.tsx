import { Container, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import SiteLogo from '../Header/SiteLogo';

const TopFooter = styled('div')(({ theme }) => ({
  width: '85%',
  margin: '0 auto',
  padding: '1.5rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.up('lg')]: { width: '100%' },
}));

const NavLinks = styled('div')({
  display: 'flex',
  gap: '1rem',
  '& a': {
    color: 'white',
    textDecoration: 'none',
  },
});

const BottomFooter = styled('div')(({ theme }) => ({
  background: theme.palette.primary.dark,
}));

const BottomFooterContainer = styled(TopFooter)(({ theme }) => ({
  maxWidth: '1200px',
  color: 'white',

  '& .terms': {
    [theme.breakpoints.up('md')]: { minWidth: '25%' },
  },

  '& .social': {
    display: 'flex',
    gap: '2rem',
    [theme.breakpoints.up('md')]: {
      minWidth: '25%',
      justifyContent: 'flex-end',
    },
    '& a': { width: '20px', height: '20px' },
    '& svg': { fill: 'white' },
  },
}));

const Footer = () => {
  return (
    <div style={{ marginTop: 'auto' }}>
      <Container maxWidth='lg' disableGutters>
        <TopFooter>
          <div onClick={() => window.scrollTo(0, 0)}>
            <SiteLogo />
          </div>
          <NavLinks>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              Home
            </Link>
            <Link to='/products'>Products</Link>
            <Link to='/partnership'>Partnership</Link>
            <Link to='/about'>About us</Link>
            <Link to='/contact'>Contact us</Link>
          </NavLinks>
        </TopFooter>
      </Container>
      <BottomFooter>
        <BottomFooterContainer>
          <NavLinks className='terms'>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              Terms & Conditions
            </Link>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              Privacy Policy
            </Link>
          </NavLinks>
          <div>&copy; 2024, Shaher Ashraf</div>
          <div className='social'>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z'></path>
              </svg>
            </Link>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z'></path>
              </svg>
            </Link>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z'></path>
              </svg>
            </Link>
          </div>
        </BottomFooterContainer>
      </BottomFooter>
    </div>
  );
};

export default Footer;
