"use client";
import useRealTime from "@/Hooks/useRealTime";
import moment from "moment";
import React, { useState, useEffect } from "react";

const Day = () => {
  const {currentTime} = useRealTime();

  return (
    <div className="mt-5">
      <p className="text-center text-white text-xl">
        {moment(currentTime).format("dddd, MMMM Do YYYY")}
      </p>
    </div>
  );
};

export default Day;
