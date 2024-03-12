import { createSlice } from '@reduxjs/toolkit';

type DrawerState = {
  open: boolean;
  activeDrawer: string;
};

const initialState: DrawerState = {
  open: false,
  activeDrawer: '',
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.open = true;
      state.activeDrawer = action.payload.activeDrawer;
      document.body.classList.add('lenis', 'lenis-smooth');
    },
    closeDrawer: (state) => {
      state.open = false;
      document.body.classList.remove('lenis', 'lenis-smooth');
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
