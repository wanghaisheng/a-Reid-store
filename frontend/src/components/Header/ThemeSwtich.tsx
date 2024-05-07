import { IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../contexts/theme/ThemeContext';

const ThemeSwitch = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <IconButton sx={{ m: '1.2rem' }} onClick={toggleColorMode}>
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon sx={{ color: 'white' }} />
      )}
    </IconButton>
  );
};

export default ThemeSwitch;
