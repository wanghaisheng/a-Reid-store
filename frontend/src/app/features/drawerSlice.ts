import { createSlice } from '@reduxjs/toolkit';

type DrawerState = {
  open: boolean;
  activeDrawer: string;
  wishlistCounter: number;
  sessionWishlistCounter: number;
  cartCounter: number;
  sessionCartCounter: number;
  trigger: boolean;
};

const initialState: DrawerState = {
  open: false,
  activeDrawer: '',
  wishlistCounter: 0,
  sessionWishlistCounter: 0,
  cartCounter: 0,
  sessionCartCounter: 0,
  trigger: false,
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
    setSessionCounters: (state, action) => {
      if (action.payload.key == 'wishlistProducts')
        state.sessionWishlistCounter = action.payload.products?.data?.length;
      if (action.payload.key == 'cartProducts')
        state.sessionCartCounter = action.payload.products?.data?.length;
    },
    fireTrigger: (state) => {
      state.trigger = !state.trigger;
    },
  },
});

export const { openDrawer, closeDrawer, setDrawerCounters, setSessionCounters, fireTrigger } =
  drawerSlice.actions;
export default drawerSlice.reducer;
