import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

type ToastState = {
  open: boolean;
  type: AlertColor;
  iconName?: string;
  message: string;
};

const initialState: ToastState = {
  open: false,
  type: 'success',
  iconName: undefined,
  message: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.iconName = action.payload.iconName;
      state.message = action.payload.message;
    },
    closeToast: (state) => {
      state.open = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
