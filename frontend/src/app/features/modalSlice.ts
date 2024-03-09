import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from '../../gql/graphql';

type ModalState = {
  open: boolean;
  modalItem: Maybe<string>;
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
      document.body.style.overflow = 'hidden';
      document.body.classList.add('lenis', 'lenis-smooth');
    },
    closeModal: (state) => {
      state.open = false;
      document.body.style.overflow = 'unset';
      document.body.classList.remove('lenis', 'lenis-smooth');
    },
    setModalItem: (state, action) => {
      state.modalItem = action.payload.id;
    },
  },
});

export const { openModal, closeModal, setModalItem } = modalSlice.actions;
export default modalSlice.reducer;
