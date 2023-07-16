"use client";
import { configureStore } from "@reduxjs/toolkit";
import selectedDeliveryManReducer from "./reducers/selectedDeliveryMan";
import userReducer from "./reducers/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    selectedDeliveryMan: selectedDeliveryManReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
