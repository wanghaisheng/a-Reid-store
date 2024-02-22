import {
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  styled,
  useTheme,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ColorModeContext } from '../../contexts/theme/ThemeContext';

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: 0,
  '& .MuiTypography-root': {
    fontSize: '1.6rem',
  },
}) as typeof FormControlLabel;

const GeneralSettings = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: '-12px' }}
        onClick={handleClick}
      >
        <SettingsIcon
          component={motion.svg}
          animate={open ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: {
              rotate: 0,
              color: 'white',
            },
            open: {
              rotate: '45deg',
              color: theme.palette.secondary.main,
            },
          }}
          transition={{ duration: 0.3 }}
        />
      </IconButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableScrollLock={true}
        // MuiPaper-root
        slotProps={{
          paper: { sx: { bgcolor: 'primary.light', borderRadius: '20px', mt: 0.4 } },
        }}
      >
        <MenuItem disableRipple sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
          <StyledFormControlLabel
            control={<Switch color='secondary' onChange={toggleColorMode} />}
            label='Dark'
          />
        </MenuItem>
        <MenuItem disableRipple sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
          <StyledFormControlLabel control={<Switch color='secondary' />} label='Arabic' />
        </MenuItem>
        <MenuItem disableRipple sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
          <StyledFormControlLabel
            control={<Switch defaultChecked color='secondary' />}
            label='English'
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default GeneralSettings;
