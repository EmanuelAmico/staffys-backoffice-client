import {
  createReducer,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { History } from "@/types/history.types";
import { HistoryService } from "@/services/history.service";
import { RootState } from "../store";
import { resetStore } from "./user";

const initialState: History[] = [];

export const getHistories = createAsyncThunk(
  "HISTORIES/GET_HISTORIES",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState;

    const histories = await HistoryService.getHistories(user);

    return histories;
  }
);

const historiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStore, () => {
      return initialState;
    })
    .addCase(
      getHistories.fulfilled,
      (state, action: PayloadAction<History[]>) => {
        return [...state, ...action.payload];
      }
    );
});

export default historiesReducer;
