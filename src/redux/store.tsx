"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import deliveryReducer from "./reducers/delivery";

const store = configureStore({
  reducer: {
    user: userReducer,
    delivery: deliveryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
