import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import { UserService } from "@/services/user.service";
import { initialStateDelivery } from "@/types/user.types";
import { resetStore } from "./user";

const initialState: initialStateDelivery = {
  deliveryPeople: [],
};

export const setDeliveryPeople = createAction<initialStateDelivery>(
  "SET_DELIVERY_PEOPLE"
);

export const getDeliveryPeople = createAsyncThunk(
  "DELIVERY/PEOPLE",
  async () => {
    const { data } = await UserService.getDeliveryPeople();

    return { deliveryPeople: data.users };
  }
);

const deliveryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStore, () => {
      return initialState;
    })
    .addCase(getDeliveryPeople.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(setDeliveryPeople, (_state, action) => {
      return action.payload;
    });
});

export default deliveryReducer;
