import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../app/store';
import { closeDrawer } from '../../app/features/drawerSlice';

const Header = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='cartHeader'>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <CloseIcon
        sx={{ fontSize: '3.5rem', cursor: 'pointer' }}
        onClick={() => dispatch(closeDrawer())}
        onKeyDown={() => dispatch(closeDrawer())}
      />
    </div>
  );
};

export default Header;
