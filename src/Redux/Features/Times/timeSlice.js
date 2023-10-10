import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBtnStartDisable: false,
  isBtnEndDisable: true,
  startTime: "",
  currentTime: "",
  workTime: 0,
  startInsertId: "",
};
const timeSlice = createSlice({
  name: "times",
  initialState,
  reducers: {
    setStartTime: (state, { payload }) => {
      state.startTime = payload?.time;
      state.isBtnStartDisable = payload?.startBtn;
      state.isBtnEndDisable = payload?.endBtn;
      state.startInsertId = payload?.startInsertId;
      localStorage.setItem("startTime", JSON.stringify(payload));
    },
    setCurrentTime: (state, { payload }) => {
      state.currentTime = payload.time;
    },
    setWorkTime: (state, { payload }) => {
      state.workTime = payload;
    },
    setStartTimeFromLocal: (state) => {
      const startTimeValue = localStorage.getItem("startTime");
      if (startTimeValue) {
        const parseStartValue = JSON.parse(startTimeValue);
        state.startTime = parseStartValue?.time;
        state.isBtnStartDisable = parseStartValue?.startBtn;
        state.isBtnEndDisable = parseStartValue?.endBtn;
        state.startInsertId = parseStartValue?.startInsertId;
      }
    },
    setFinishTimeFromLocal: (state) => {
      localStorage.removeItem("startTime");
      return initialState;
    },
  },
});

export const {
  setStartTime,
  setWorkTime,
  setStartTimeFromLocal,
  setCurrentTime,
  setFinishTimeFromLocal,
} = timeSlice.actions;

export default timeSlice.reducer;
