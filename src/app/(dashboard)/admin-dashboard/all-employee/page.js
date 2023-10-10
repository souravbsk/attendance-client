"use client";
import React, { useState } from "react";
import EmployeeList from "./EmployeeListTable";
import ViewEmployee from "./ViewEmployee";
import UpdateEmployeeDetails from "./UpdateEmployeeDetails";

const AllEmployee = () => {
  const [ViewEmployeeDetails, setViewEmployeeDetails] = useState({});
  const [isViewModalOpen, setViewModalIsOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleViewEmployee = (details) => {
    setViewEmployeeDetails({});
    if (details) {
      console.log(details);
      setViewEmployeeDetails(details);
      setViewModalIsOpen(true);
    }
  };
  const handleEmployeeDetails = (details) => {
    setViewEmployeeDetails({});
    if (details) {
      setViewEmployeeDetails(details);
      setUpdateModalOpen(true);
    }
  };
  return (
    <div className="container">
      <h2 className="text-center text-2xl font-mono font-semibold text-[#0D64A5] mt-12">
        All Employees
      </h2>
      <div className="mt-8">
        <EmployeeList
          handleEmployeeDetails={handleEmployeeDetails}
          handleViewEmployee={handleViewEmployee}
        ></EmployeeList>
      </div>
      <div>
        <UpdateEmployeeDetails
          setUpdateModalOpen={setUpdateModalOpen}
          isUpdateModalOpen={isUpdateModalOpen}
          employee={ViewEmployeeDetails}
        ></UpdateEmployeeDetails>
        <ViewEmployee
          isViewModalOpen={isViewModalOpen}
          setViewModalIsOpen={setViewModalIsOpen}
          employee={ViewEmployeeDetails}
        ></ViewEmployee>
      </div>
    </div>
  );
};

export default AllEmployee;
