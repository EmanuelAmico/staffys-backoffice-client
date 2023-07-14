import {
  createReducer,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";
import { User, UserLogin } from "@/types/user.types";

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

export const editUserActive = createAsyncThunk(
  "USER/EDIT",
  async (is_active: boolean, thunkAPI) => {
    const { user } = thunkAPI.getState() as { user: User };
    const userid = {
      _id: user._id,
      is_active,
    };

    const response = await UserService.editUser(userid);
    return response;
  }
);

export const login = createAsyncThunk(
  "USER/LOGIN",
  async (userData: UserLogin) => {
    const response = await AuthService.login(userData);
    const user = response.data.user;
    const token = response.data.token;
    localStorage.setItem("token", token);
    return { ...user, token };
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
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    });
});
export default selectedUserReducer;
