import FormatTimeWorked from "@/components/FormateTimeWorked/FormatTimeWorked";
import React from "react";

const useFormatTimeWorked = (workTime) => {
  const { seconds, hours, minutes, remainingSeconds } =
    FormatTimeWorked(workTime);

  const workTimeFormate = `${hours} h : ${minutes} m : ${remainingSeconds} s `;
  return workTimeFormate;
};

export default useFormatTimeWorked;
