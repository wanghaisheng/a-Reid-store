import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledButton from '../Buttons/StyledButton';
import { closeDrawer } from '../../app/features/drawerSlice';
import { useAppDispatch } from '../../app/store';
import { useTranslation } from 'react-i18next';

const StyledEmpty = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& img': {
    width: '80%',
    display: 'block',
    margin: '0 auto',
  },

  '& a': { textDecoration: 'none' },

  '& .button': {
    margin: '0 auto',
    display: 'block',
    padding: '1rem 3rem',
    color: 'white',
    background: 'black',
    '&:hover': { background: theme.palette.primary.main },
    '& a': { color: 'white', textDecoration: 'none' },
  },
}));

const Empty = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <StyledEmpty className='emptyCart'>
      <Box>
        <img src={window.origin + '/assets/drawer/empty.png'} />
        <Typography variant='h5' sx={{ textAlign: 'center', mb: '2rem' }}>
          {t('Your2')} {name} {t('IsEmpty')}!
        </Typography>
        <Typography variant='body1' sx={{ textAlign: 'center', mb: '2rem' }}>
          {t('YouHaveNoItemsInYour')} {name}.
          <br /> {t('LetsGoBuySomething')}!
        </Typography>
        <Link to={`${window.origin}/products`}>
          <StyledButton className='button' onClick={() => dispatch(closeDrawer())}>
            {t('SHOP_NOW')}
          </StyledButton>
        </Link>
      </Box>
    </StyledEmpty>
  );
};

export default Empty;
