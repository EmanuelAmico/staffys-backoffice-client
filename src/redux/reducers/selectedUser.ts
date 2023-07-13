import {
  createReducer,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserService } from "@/services/user.service";
import { User } from "@/types/user.types";

const initialState: User = {
  _id: "",
  name: "",
  lastname: "",
  email: "",
  is_admin: false,
  is_active: false,
  urlphoto: "",
  is_deleted: false,
  resetToken: "",
  pendingPackages: [],
  currentPackage: null,
  historyPackages: [],
  token: "",
};

export const setSelectedUser = createAsyncThunk(
  "SELECTED_USER/SET",
  async (_id: string) => {
    const response = await UserService.getUserById(_id);
    return response;
  }
);

const selectedUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      setSelectedUser.fulfilled,
      (_state, action: PayloadAction<User>) => {
        return action.payload;
      }
    )
    .addCase(setSelectedUser.rejected, (state) => {
      return state;
    });
});
export default selectedUserReducer;
