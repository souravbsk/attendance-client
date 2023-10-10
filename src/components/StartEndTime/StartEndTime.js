"use client";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const StartEndTime = ({currentTime}) => {
  const { isBtnStartDisable, isBtnEndDisable, startTime, workTime } =
    useSelector((store) => store.timesSlice);
  return (
    <div className="text-center flex items-center flex-col mt-6 space-y-3">
      <button className=" block font-medium text-xl  rounded-md text-white">
        <span className="font-serif font-semibold">Start:</span> {moment(startTime ? startTime : currentTime).format("h:mm:ss a")}
      </button>
     {isBtnStartDisable && <button className=" block px-5 font-medium text-xl  rounded-md text-white">
        <span className="font-serif font-semibold">End:</span> {moment(currentTime).format("h:mm:ss a")}
      </button>}

    </div>
  );
};

export default StartEndTime;
