import timeSlice from "./Features/Times/timeSlice";

import { configureStore } from "@reduxjs/toolkit";
import trackerSlice from "./Features/trackerSlice/trackerSlice";
import userSlice from "./Features/userSlice/userSlice";
import baseApi from "./Features/api/baseApi";

const store = configureStore({
  reducer: {
    timesSlice: timeSlice,
    trackerSlice: trackerSlice,
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
