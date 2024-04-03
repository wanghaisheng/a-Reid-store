import { createSlice } from '@reduxjs/toolkit';

type DrawerState = {
  open: boolean;
  activeDrawer: string;
  wishlistCounter: number;
  cartCounter: number;
};

const initialState: DrawerState = {
  open: false,
  activeDrawer: '',
  wishlistCounter: 0,
  cartCounter: 0,
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
    setDrawerCounters: (state, action) => {
      if (action.payload.target == 'wishlist') state.wishlistCounter = action.payload.counter;
      if (action.payload.target == 'cart') state.cartCounter = action.payload.counter;
    },
  },
});

export const { openDrawer, closeDrawer, setDrawerCounters } = drawerSlice.actions;
export default drawerSlice.reducer;
