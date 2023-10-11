import {
  getTimeFromLocal,
  removeTimeFromLocal,
  setTimeFormLocal,
} from "@/Utils/timeHandler";
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
      setTimeFormLocal(payload);
    },
    setCurrentTime: (state, { payload }) => {
      state.currentTime = payload.time;
    },
    setWorkTime: (state, { payload }) => {
      state.workTime = payload;
    },
    setStartTimeFromLocal: (state) => {
      const parseStartValue = getTimeFromLocal();
      if (parseStartValue) {
        state.startTime = parseStartValue?.time;
        state.isBtnStartDisable = parseStartValue?.startBtn;
        state.isBtnEndDisable = parseStartValue?.endBtn;
        state.startInsertId = parseStartValue?.startInsertId;
      }
    },
    setFinishTimeFromLocal: (state) => {
      removeTimeFromLocal();
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
