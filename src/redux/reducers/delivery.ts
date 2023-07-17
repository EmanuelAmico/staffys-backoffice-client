import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "@/services/user.service";
import { initialStateDelivery } from "@/types/user.types";

const initialState: initialStateDelivery = {
  deliveryPeople: [],
};

export const getDeliveryPeople = createAsyncThunk(
  "DELIVERY/PEOPLE",
  async () => {
    const { data } = await UserService.getDeliveryPeople();

    return { deliveryPeople: data.users };
  }
);

const deliveryReducer = createReducer(initialState, (builder) => {
  builder.addCase(getDeliveryPeople.fulfilled, (_state, action) => {
    return action.payload;
  });
});

export default deliveryReducer;
