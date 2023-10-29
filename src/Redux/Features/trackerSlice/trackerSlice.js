import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  address: {},
  isError: false,
  error: "",
  location: {},
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracker.pending, (state) => {
        state.isLoading = true;
        state.address = {};
        state.isError = false;
        state.error = "";
        state.location = {};
      })
      .addCase(fetchTracker.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.address = payload;
        state.isError = false;
        state.error = "";
        state.location = {};
        //console.log(payload);
      })
      .addCase(fetchTracker.rejected, (state, action) => {
        state.isLoading = false;
        state.address = {};
        state.isError = true;
        state.error = action?.error?.message;
        state.location = {};
      });
  },
});

export default trackerSlice.reducer;

export const fetchTracker = createAsyncThunk(
  "tracker/fetchTracker",
  async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      console.log(response, "fdfdsf");
      if (response.data) {
        const getLocationData = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/api/ip-api/${response?.data?.ip}`
        );
        console.log(getLocationData, "get location");
        if (getLocationData.data.status == "success") {
          const { lat, lon } = await getLocationData.data;
          const getlocationDetails = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const locationData = await getlocationDetails?.data;
          const locationDetails = {
            addressDetails: locationData?.address,
            providerDetails: getLocationData.data,
            lat: locationData?.lat,
            lon: locationData?.lon,
          };

          return locationDetails;
        }
      }
    } catch (error) {
      //console.log(error);
    }
  }
);
