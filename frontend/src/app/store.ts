import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './features/productsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { modalSlice } from './features/modalSlice';
import { toastSlice } from './features/toastSlice';

const rootReducer = combineSlices(modalSlice, productsSlice, toastSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
