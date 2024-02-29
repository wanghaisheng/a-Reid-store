import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({
  toggleDrawer,
  title,
}: {
  toggleDrawer: (open: boolean) => () => void;
  title: string;
}) => {
  return (
    <div className='cartHeader'>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <CloseIcon
        sx={{ fontSize: '3.5rem', cursor: 'pointer' }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      />
    </div>
  );
};

export default Header;
