import { styled } from '@mui/material';
import StyledButton from '../Buttons/StyledButton';

const Button = styled(StyledButton)(({ theme }) => ({
  padding: '1rem 3rem',
  color: 'white',
  background: 'black',
  '&:hover': { background: theme.palette.primary.main },
}));

export default Button;
