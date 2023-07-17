"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import deliveryReducer from "./reducers/delivery";
import packageReducer from "./reducers/package";

const store = configureStore({
  reducer: {
    user: userReducer,
    delivery: deliveryReducer,
    package: packageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
