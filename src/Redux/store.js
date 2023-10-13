import timeSlice from "./Features/Times/timeSlice";

import { configureStore } from "@reduxjs/toolkit";
import trackerSlice from "./Features/trackerSlice/trackerSlice";
import userSlice from "./Features/userSlice/userSlice";
import baseApi from "./Features/api/baseApi";
import AttendanceSlice from "./Features/AttendanceSlice/AttendanceSlice";

const store = configureStore({
  reducer: {
    timesSlice: timeSlice,
    trackerSlice: trackerSlice,
    userSlice: userSlice,
    attendanceSlice:AttendanceSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
