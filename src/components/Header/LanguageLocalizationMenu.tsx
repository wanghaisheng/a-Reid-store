import { List, ListItemText, Menu, MenuItem, Button, ButtonProps, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StyledButton from '../Buttons/StyledButton';
import { useContext, useState } from 'react';
import { LocaleContext } from '../../contexts/Locale/LocaleContext';
import { useTranslation } from 'react-i18next';

const ListItemButton = styled(StyledButton)<ButtonProps>(({ theme }) => ({
  color: 'white',
  maxWidth: 50,
  gap: '1.5rem',
  padding: '0.3rem 2.5rem',
  backgroundColor: theme.palette.primary.dark,
  'span.MuiButton-endIcon': {
    marginLeft: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
})) as typeof Button;

const LanguageLocalizationMenu = () => {
  const { lang, handleSetLang } = useContext(LocaleContext);
  const options = ['En', 'Ar'];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(lang ? (lang == 'en' ? 0 : 1) : 0);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    handleSetLang(index == 0 ? 'en' : 'ar');
    i18n.changeLanguage(index == 0 ? 'en' : 'ar');
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component='nav' aria-label='Device settings'>
        <ListItemButton
          id='lock-button'
          aria-haspopup='listbox'
          aria-controls='lock-menu'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          endIcon={<ArrowDropDownIcon />}
        >
          <ListItemText
            sx={{ '& p.MuiTypography-root': { color: 'white', fontSize: '1.5rem' } }}
            secondary={options[selectedIndex]}
          />
        </ListItemButton>
      </List>
      <Menu
        id='lock-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              width: anchorEl && anchorEl.offsetWidth,
              bgcolor: 'primary.light',
              borderRadius: '15px',
            },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
            sx={{
              color: 'white',
              fontSize: '2rem',
              '&:hover': { color: 'secondary.main' },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageLocalizationMenu;
