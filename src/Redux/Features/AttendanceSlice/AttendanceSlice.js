import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendanceEmail: "",
  startDate: "",
  endDate: "",
};
const AttendanceSlice = createSlice({
  name: "times",
  initialState,
  reducers: {
    setAttendanceEmail: (state, { payload }) => {
      state.attendanceEmail = payload;
    },
    setStartDate: (state, { payload }) => {
      console.log(payload);
      state.startDate = payload;
    },
    setEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
  },
});

export const { setAttendanceEmail, setStartDate, setEndDate } =
  AttendanceSlice.actions;

export default AttendanceSlice.reducer;
