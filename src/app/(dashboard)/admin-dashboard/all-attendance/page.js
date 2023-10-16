import React from "react";
import EmployeeAttendanceData from "./EmployeeAttendanceData";

const AllAttendance = () => {
  return (
    <div className="container">
      <h2 className="text-center text-2xl font-mono font-semibold text-[#0D64A5] mt-12">
        All Attendance
      </h2>
      <EmployeeAttendanceData></EmployeeAttendanceData>
    </div>
  );
};

export default AllAttendance;
