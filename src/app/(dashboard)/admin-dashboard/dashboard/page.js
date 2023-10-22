import React from "react";
import EmployeeAttendanceTable from "../all-attendance/EmployeeAttendanceTable";
import DatePickerBlock from "@/components/DatePickerBlock/DatePickerBlock";

const Dashboard = () => {
  return (
    <div className="">
      <div>
        <h2 className=" my-8 font-semibold text-center text-[#00548E] md:text-2xl">
          Latest Employee Attendance{" "}
        </h2>
      </div>
      <DatePickerBlock></DatePickerBlock>
      <EmployeeAttendanceTable></EmployeeAttendanceTable>
    </div>
  );
};

export default Dashboard;
