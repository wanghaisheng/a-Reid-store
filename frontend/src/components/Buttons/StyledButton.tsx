import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)<ButtonProps>({
  textTransform: 'capitalize',
  fontSize: '1.5rem !important',
  fontWeight: 'bold',
  borderRadius: '40px',
  padding: '0.5rem 2.5rem',
}) as typeof Button;

export default StyledButton;
