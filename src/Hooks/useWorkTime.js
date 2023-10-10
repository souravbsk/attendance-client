"use client";
import { setCurrentTime, setWorkTime } from "@/Redux/Features/Times/timeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRealTime from "./useRealTime";

const useWorkTime = () => {
  const { currentTime } = useRealTime();
  const { startTime } = useSelector((store) => store.timesSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTime({ time: currentTime.getTime() }));
    if (startTime) {
      const workTimeCalculate = currentTime - startTime;

      //statr work
      dispatch(setWorkTime(workTimeCalculate));
    }
  }, [currentTime, startTime,dispatch]);
};

export default useWorkTime;
