import { createSlice } from "@reduxjs/toolkit";
import { CarTypes } from "../../components/CardCar/types";

export interface CarChoosed {
  car: CarTypes & {
    withDriver?: boolean;
  };
  payment: {
    creditCard?: {
      fullName: string;
      cardNumber: string;
      validity: string;
      securityNumber: number;
      installments: number;
      flag?: string;
    };
    rentalDays: Array<string>;
    chosenDays: number;
    total: number;
    initialRental: string;
    endRental: string;
  };
}

const initialState: CarChoosed = {
  car: {
    withDriver: false,
  },
  payment: {
    chosenDays: 0,
    total: 0,
    rentalDays: [],
    initialRental: "",
    endRental: "",
  },
};

export const carChoosedSlice = createSlice({
  name: "carChoosed",
  initialState,
  reducers: {
    addChoosenDays: (state, action) => {
      state.payment.chosenDays = action.payload;
    },
    addPaymentCreditCard: (state, action) => {
      state.payment.creditCard = action.payload;
    },
    deleteCreditCard: (state, action) => {
      state.payment.creditCard = action.payload;
    },
    changeTotal: (state, action) => {
      state.payment.total = action.payload;
    },
    addCarToPayment: (state, action) => {
      state.car = action.payload.car;
      state.payment = action.payload.payment;
    },
    deleteCar: (state) => {
      state.car = {
        withDriver: false,
      };
      state.payment = {
        chosenDays: 0,
        total: 0,
        rentalDays: [],
        endRental: "",
        initialRental: "",
      };
    },
  },
});

export const {
  addChoosenDays,
  addPaymentCreditCard,
  deleteCreditCard,
  changeTotal,
  addCarToPayment,
  deleteCar,
} = carChoosedSlice.actions;

export default carChoosedSlice.reducer;
