import { PackageService } from "@/services/package.service";
import { PackageBody, initialStatePackage } from "@/types/package.types";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { resetStore } from "./user";

const initialState: initialStatePackage = {
  availablePackages: [],
};

export const detelePackageById = createAsyncThunk(
  "PACKAGE/DELETE",
  async (_id: string, thunkAPI) => {
    await PackageService.deletePackageById(_id);
    const state = thunkAPI.getState() as RootState;
    return {
      ...state.package,
      availablePackages: state.package.availablePackages.filter(
        (item) => item._id !== _id
      ),
    };
  }
);

export const createPackages = createAsyncThunk(
  "PACKAGE/CREATE",
  async (packageData: PackageBody) => {
    const { data } = await PackageService.createPackage(packageData);
    return data.package;
  }
);

export const getAvailablePackages = createAsyncThunk(
  "PACKAGE/AVAILABLE-PACKAGES",
  async () => {
    const { data } = await PackageService.getAvailablePackages();

    return { availablePackages: data.packages };
  }
);

const packageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStore, () => {
      return initialState;
    })
    .addCase(createPackages.fulfilled, (_state, _action) => {
      return;
    })
    .addCase(detelePackageById.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(getAvailablePackages.fulfilled, (_state, action) => {
      return action.payload;
    });
});

export default packageReducer;
