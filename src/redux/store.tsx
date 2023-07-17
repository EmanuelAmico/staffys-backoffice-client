"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectedUserReducer from "./reducers/selectedUser";
import packageReducer from "./reducers/package";

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    package: packageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
