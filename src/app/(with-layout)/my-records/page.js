"use client";
import React, { useState } from "react";
import RecordsTable from "./RecordsTable";
import ViewAttendanceDetails from "@/app/(dashboard)/admin-dashboard/all-attendance/ViewAttendanceDetails";

const MyRecords = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [isAttendanceModal, setAttendanceModal] = useState(false);
  const handleViewAttendance = (data) => {
    setEmployeeDetails({});
    if (data) {
      setEmployeeDetails(data);
      setAttendanceModal(true);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-12 text-3xl font-bold text-white mb-12">
        My Working History
      </h1>
      <RecordsTable handleViewAttendance={handleViewAttendance}></RecordsTable>
      <ViewAttendanceDetails
        isAttendanceModal={isAttendanceModal}
        setAttendanceModal={setAttendanceModal}
        employeeDetails={employeeDetails}
      ></ViewAttendanceDetails>
    </div>
  );
};

export default MyRecords;
