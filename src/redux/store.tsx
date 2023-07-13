"use client";
import { configureStore } from "@reduxjs/toolkit";
import selectedUserReducer from "./reducers/selectedUser";
const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
