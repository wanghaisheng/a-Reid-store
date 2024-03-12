import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { productsSlice } from './features/productsSlice';
import { modalSlice } from './features/modalSlice';
import { toastSlice } from './features/toastSlice';
import { drawerSlice } from './features/drawerSlice';

const rootReducer = combineSlices(productsSlice, modalSlice, drawerSlice, toastSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
