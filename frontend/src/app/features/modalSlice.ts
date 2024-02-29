import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../pages/Products/types';

type ModalState = {
  open: boolean;
  modalItem: Product | null;
};

const initialState: ModalState = {
  open: false,
  modalItem: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    setModalItem: (state, action) => {
      state.modalItem = action.payload.product;
    },
  },
});

export const { openModal, closeModal, setModalItem } = modalSlice.actions;
export default modalSlice.reducer;
