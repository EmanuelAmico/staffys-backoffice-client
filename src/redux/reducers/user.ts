import {
  createAction,
  createReducer,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserLogin, User } from "@/types/user.types";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { RootState } from "../store";

const initialState: User = {
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
  token: "",
};

export const setUser = createAction<User>("SET_USER");
export const logout = createAction("LOGOUT");

export const toggleDisableUser = createAsyncThunk(
  "USER/TOGGLE_DISABLE_USER",
  async (_, thunkAPI) => {
    const { user, selectedDeliveryMan } = thunkAPI.getState() as RootState;

    if (selectedDeliveryMan.is_disabled) {
      await UserService.editUser(user, {
        _id: selectedDeliveryMan._id,
        is_disabled: false,
      });
    } else {
      await UserService.disableUser(user, selectedDeliveryMan._id);
    }
  }
);

export const login = createAsyncThunk(
  "USER/LOGIN",
  async (userData: UserLogin) => {
    const response = await AuthService.login(userData);
    const user = response.data.user;
    const token = response.data.token;
    if (!user.is_admin) throw new Error("User is not admin");
    localStorage.setItem("token", token);
    return { ...user, token };
  }
);

export const checkForUserTokenAndPersistSession = createAsyncThunk(
  "USER/PERSIST_SESSION",
  async () => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No user token found");

    const user = await AuthService.me(token);

    return { ...user, token };
  }
);

export const me = createAsyncThunk("USER/ME", async (_, thunkAPI) => {
  const {
    user: { token },
  } = thunkAPI.getState() as RootState;

  const user = await AuthService.me(token);

  if (!user.is_admin) throw new Error("User is not admin");

  return { ...user, token };
});

export const editUser = createAsyncThunk(
  "USER/EDIT",
  async (fields: Partial<Omit<User, "token">>, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState;

    const response = await UserService.editUser(user, fields);

    return response;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(logout, () => {
      localStorage.removeItem("token");
      return initialState;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(
      checkForUserTokenAndPersistSession.fulfilled,
      (state, action: PayloadAction<User>) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    )
    .addCase(checkForUserTokenAndPersistSession.rejected, (_state, _action) => {
      localStorage.removeItem("token");
      return initialState;
    })
    .addCase(me.fulfilled, (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(me.rejected, (state) => {
      return state;
    })
    .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(editUser.rejected, (state) => {
      return state;
    })
    .addCase(toggleDisableUser.fulfilled, (state) => {
      return state;
    })
    .addCase(toggleDisableUser.rejected, (state) => {
      return state;
    });
});

export default userReducer;
