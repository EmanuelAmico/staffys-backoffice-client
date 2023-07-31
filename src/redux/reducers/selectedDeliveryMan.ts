import {
  createReducer,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserService } from "@/services/user.service";
import { User } from "@/types/user.types";
import { resetStore } from "./user";

const initialState: Omit<User, "token"> = {
  _id: "",
  name: "",
  lastname: "",
  email: "",
  is_admin: false,
  is_able_to_deliver: false,
  is_disabled: false,
  urlphoto: "",
  is_deleted: false,
  resetToken: "",
  pendingPackages: [],
  currentPackage: null,
  historyPackages: [],
};

export const setSelectedDeliveryMan = createAsyncThunk(
  "SELECTED_USER/SET",
  async (_id: string) => {
    const response = await UserService.getUserById(_id);
    return response.data;
  }
);

const selectedDeliveryManReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStore, () => {
      return initialState;
    })
    .addCase(
      setSelectedDeliveryMan.fulfilled,
      (_state, action: PayloadAction<User>) => {
        return action.payload;
      }
    )
    .addCase(setSelectedDeliveryMan.rejected, (state) => {
      return state;
    });
});

export default selectedDeliveryManReducer;
