import { IconButton } from '@mui/material';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)({
  '&:hover': {
    'span.MuiBadge-badge.MuiBadge-standard.MuiBadge-anchorOriginTopRight': {
      backgroundColor: '#fff771',
    },
  },
}) as typeof IconButton;

export default StyledIconButton;
