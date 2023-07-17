import { PackageService } from "@/services/package.service";
import { PackageBody, initialStatePackage } from "@/types/package.types";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

const initialState: initialStatePackage = {
  availablePackages: [],
};

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
    .addCase(createPackages.fulfilled, (_state, _action) => {
      return;
    })
    .addCase(getAvailablePackages.fulfilled, (_state, action) => {
      return action.payload;
    });
});

export default packageReducer;
