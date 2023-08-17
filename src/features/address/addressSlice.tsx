import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationType {
  country: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
}

export interface LocationState {
  fullname: string;
  phone: string;
  apartment: string;
  location: LocationType[];
}

// Define the initial state using that type
const initialState: LocationState = {
  fullname: "",
  phone: "",
  apartment: "",
  location: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.location = action.payload.location;
      state.fullname = action.payload.fullname;
      state.phone = action.payload.phone;
      state.apartment = action.payload.apartment;
    },
    removeLocation: (state) => {
      state.location = [];
    },
  },
});

export const { setLocation, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
