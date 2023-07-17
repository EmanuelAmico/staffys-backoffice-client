import { PackageService } from "@/services/package.service";
import { PackageBody, initialStatePackage } from "@/types/package.types";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

const initialState: initialStatePackage = {
  AvailablePackages: [],
};

export const createPackages = createAsyncThunk(
  "PACKAGE/CREATE",
  async (packageData: PackageBody) => {
    const { data } = await PackageService.createPackage(packageData);
    return data.package;
  }
);

const packageReducer = createReducer(initialState, (builder) => {
  builder.addCase(createPackages.fulfilled, (_state, _action) => {
    return;
  });
});

export default packageReducer;
