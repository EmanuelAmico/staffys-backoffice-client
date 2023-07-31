import {
  createReducer,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { PopulatedHistory } from "@/types/history.types";
import { HistoryService } from "@/services/history.service";
import { RootState } from "../store";
import { resetStore } from "./user";

const initialState: PopulatedHistory = {
  _id: "",
  date: "",
  activeUsers: [],
  targetPackages: [],
};

export const getHistoryByDate = createAsyncThunk(
  "SELECTED_HISTORY/GET_HISTORY_BY_DATE",
  async (date: string, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState;

    const history = await HistoryService.getHistoryByDate(user, date);

    return history;
  }
);

export const getOrCreateTodayHistory = createAsyncThunk(
  "SELECTED_HISTORY/GET_OR_CREATE_TODAY_HISTORY",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState;

    const history = await HistoryService.getOrCreateTodayHistory(user);

    return history;
  }
);

const selectedHistoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStore, () => {
      return initialState;
    })
    .addCase(
      getHistoryByDate.fulfilled,
      (state, action: PayloadAction<PopulatedHistory>) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    );
  builder.addCase(
    getOrCreateTodayHistory.fulfilled,
    (state, action: PayloadAction<PopulatedHistory>) => {
      return {
        ...state,
        ...action.payload,
      };
    }
  );
});

export default selectedHistoryReducer;
