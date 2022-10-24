import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "../../features/modalCar/modalCarSlice";
import carChoosedReducer from "../../features/carChoosed/carChoosedSlice";

export const store = configureStore({
    reducer:{
        modalReducer,
        carChoosedReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;