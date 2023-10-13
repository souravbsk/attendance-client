import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendanceEmail: "",
};
const AttendanceSlice = createSlice({
  name: "times",
  initialState,
  reducers: {
    setAttendanceEmail: (state, { payload }) => {
      state.attendanceEmail = payload;
    },
  },
});

export const { setAttendanceEmail } = AttendanceSlice.actions;

export default AttendanceSlice.reducer;
