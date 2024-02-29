import {
  Divider,
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
import { LocaleContext } from '../../contexts/locale/LocaleContext';
import { useTranslation } from 'react-i18next';

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
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { lang, handleSetLang } = useContext(LocaleContext);
  const { i18n } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocalization = (lang: string) => {
    handleSetLang(lang);
    i18n.changeLanguage(lang);
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
            control={
              <Switch color='secondary' checked={mode === 'light'} onChange={toggleColorMode} />
            }
            label='Light'
          />
        </MenuItem>
        <MenuItem disableRipple sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
          <StyledFormControlLabel
            control={
              <Switch color='secondary' checked={mode === 'dark'} onChange={toggleColorMode} />
            }
            label='Dark'
          />
        </MenuItem>
        <Divider />
        <MenuItem disableRipple sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
          <StyledFormControlLabel
            control={
              <Switch
                color='secondary'
                checked={lang == 'ar'}
                onChange={() => handleLocalization('ar')}
              />
            }
            label='Arabic'
          />
        </MenuItem>
        <MenuItem disableRipple sx={{ color: 'white', '&:hover': { color: 'secondary.main' } }}>
          <StyledFormControlLabel
            control={
              <Switch
                defaultChecked
                color='secondary'
                checked={lang == 'en'}
                onChange={() => handleLocalization('en')}
              />
            }
            label='English'
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default GeneralSettings;
