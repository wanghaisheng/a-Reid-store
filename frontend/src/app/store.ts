import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './features/productsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { modalSlice } from './features/modalSlice';

const rootReducer = combineSlices(modalSlice, productsSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch() */
