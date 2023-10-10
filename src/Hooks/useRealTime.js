"use client";
import React, { useEffect, useState } from "react";

const useRealTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { currentTime, setCurrentTime };
};

export default useRealTime;
