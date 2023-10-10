"use client";
import React, { useState } from "react";
import EmployeeNameTable from "./EmployeeNameTable";
import EmployeeDataTable from "./EmployeeDataTable";
import ViewAttendanceDetails from "./ViewAttendanceDetails";

const AllAttendance = () => {
  const [state, setState] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isAttendanceModal, setAttendanceModal] = useState(false);
  const handleViewAttendance = (data) => {
    //console.log(data);
    if(data){
      setEmployeeDetails(data);
      setAttendanceModal(true)
    }
  };
  return (
    <div className="container">
      <div className="">
        <h2 className="text-center text-2xl font-mono font-semibold text-[#0D64A5] mt-12">
          All Attendance
        </h2>
        <button
          className="bg-[#00548E] hover:text-white px-3 py-2 rounded-md text-white"
          onClick={() => setState(true)}
        >
          Employee Name
        </button>
      </div>
      <div className="">
        <EmployeeNameTable
          setState={setState}
          state={state}
        ></EmployeeNameTable>
        <EmployeeDataTable
          handleViewAttendance={handleViewAttendance}
        ></EmployeeDataTable>
      </div>
      <div>
        <ViewAttendanceDetails
          isAttendanceModal={isAttendanceModal}
          setAttendanceModal={setAttendanceModal}
          employeeDetails={employeeDetails}
        ></ViewAttendanceDetails>
      </div>
    </div>
  );
};

export default AllAttendance;
