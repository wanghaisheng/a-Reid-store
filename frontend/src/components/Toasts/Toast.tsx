import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { closeToast } from '../../app/features/toastSlice';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const Toast = () => {
  const { open, type, iconName, message } = useAppSelector((store) => store.toast);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeToast());
  };

  const handleIcon = () => {
    if (iconName == 'HighlightOffOutlinedIcon')
      return <HighlightOffOutlinedIcon fontSize='inherit' />;
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} icon={handleIcon()} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
