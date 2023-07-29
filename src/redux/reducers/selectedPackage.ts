import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { PackageService } from "@/services/package.service";
import { Package } from "@/types/package.types";

const initialState: Package = {
  _id: "",
  address: "",
  receptorName: "",
  deliveryMan: "",
  weight: null,
  deliveredAt: null,
  status: null,
  deadline: null,
  city: "",
  coordinatesPackage: { lat: 0, lng: 0 },
  coordinatesUser: { lat: 0, lng: 0 },
  distance: null,
  updatedAt: "",
};

export const fetchPackageById = createAsyncThunk(
  "PACKAGE/FETCH_PACKAGE_BY_ID",
  async (_id: string | string[]) => {
    const response = await PackageService.getPackageById(_id);
    return response.data.packages;
  }
);

const selectedPackageReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchPackageById.fulfilled, (_state, action) => {
    return action.payload;
  });
});

export default selectedPackageReducer;
