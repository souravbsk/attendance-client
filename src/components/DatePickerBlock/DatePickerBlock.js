"use client";
import {
  setAttendanceEmail,
  setEndDate,
  setStartDate,
} from "@/Redux/Features/AttendanceSlice/AttendanceSlice";
import { useGetEmployeeAttendanceQuery } from "@/Redux/Features/api/AdminApi/EmployeeAttendanceApi";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

const DatePickerBlock = () => {
  const [startDate, setStartDatePicker] = useState("");
  const [endDate, setEndDatePicker] = useState("");
  const { attendanceEmail } = useSelector((state) => state?.attendanceSlice);
  const dispatch = useDispatch();

  // const [fetchDate, { date }] = useGetEmployeeAttendanceQuery();

  const handleDatePicker = () => {
    const getStartDate = new Date(startDate).getTime();
    const getEndDate = new Date(endDate).getTime();
    dispatch(setStartDate(getStartDate));
    dispatch(setEndDate(getEndDate));
  };
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDatePicker(date)}
          selectsStart
          className="p-3 border-[#00548E] border-2 rounded-lg"
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <DatePicker
          selected={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setEndDatePicker(date)}
          selectsEnd
          className="p-3 border-[#00548E] border-2 rounded-lg"
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div>
        <button
          onClick={handleDatePicker}
          className="bg-[#00548E] text-white rounded-md px-3 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DatePickerBlock;
