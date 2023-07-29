"use client";

import { configureStore } from "@reduxjs/toolkit";
import selectedDeliveryManReducer from "./reducers/selectedDeliveryMan";
import userReducer from "./reducers/user";
import deliveryReducer from "./reducers/delivery";
import packageReducer from "./reducers/package";
import selectedHistoryReducer from "./reducers/selectedHistory";
import historiesReducer from "./reducers/histories";
import selectedPackageReducer from "./reducers/selectedPackage";

const store = configureStore({
  reducer: {
    user: userReducer,
    selectedDeliveryMan: selectedDeliveryManReducer,
    delivery: deliveryReducer,
    package: packageReducer,
    histories: historiesReducer,
    selectedHistory: selectedHistoryReducer,
    selectedPackage: selectedPackageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
