import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const geoLocationSlice = createSlice({
  name: "geoLocation",
  initialState: {
    type: "Point",
    coordinates: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.coordinates = action.payload.coordinates;
    },
  },
});

// selectors
export const selectLocation = (state: RootState) => state.geoLocation;

export const { setLocation } = geoLocationSlice.actions;

export default geoLocationSlice.reducer;
