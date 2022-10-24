import { createSlice } from "@reduxjs/toolkit";
import { CarTypes } from "../../components/CardCar/types";

export interface ModalCarState {
  carSendedToModal: CarTypes;
  modalIsOpen: boolean;
}

const initialState: ModalCarState = {
  carSendedToModal: {},
  modalIsOpen: false,
};

export const modalCarSlice = createSlice({
  name: "modalCar",
  initialState,
  reducers: {
    addCarToModal: (state, action) => {
      state.carSendedToModal = action.payload;
      state.modalIsOpen = true;
    },
    removeCarToModal: (state) => {
      state.carSendedToModal = {};
      state.modalIsOpen = false;
    },
    changeStatusModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const { addCarToModal, removeCarToModal, changeStatusModal } =
  modalCarSlice.actions;

export default modalCarSlice.reducer;
