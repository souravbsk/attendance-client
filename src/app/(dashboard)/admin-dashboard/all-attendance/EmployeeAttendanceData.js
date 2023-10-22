"use client";
import { useState } from "react";

import EmployeeNameDrawer from "./EmployeeNameDrawer";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useGetEmployeeNamesQuery } from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";
import AttendanceDetailsModal from "@/components/AttendanceDetailsModal/AttendanceDetailsModal";
import { useGetEmployeeAttendanceDetailsMutation } from "@/Redux/Features/api/AdminApi/EmployeeAttendanceApi";
import Loader from "@/components/Loader/Loader";
import DatePickerBlock from "@/components/DatePickerBlock/DatePickerBlock";
import { useSelector } from "react-redux";

const EmployeeAttendanceData = () => {
  const {
    data: getEmployeeData,
    isLoading,
    isError,
  } = useGetEmployeeNamesQuery();
  const [
    getEmployeeDetails,
    { isLoading: detailsLoading, error: detailsError },
  ] = useGetEmployeeAttendanceDetailsMutation();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState({});
  const handleViewEmployeeAttendance = (details) => {
    setViewDetails({});
    setOpen(true);
    console.log(getEmployeeData);
    const employeeDetails = {
      details,
    };
    getEmployeeDetails({ id: details?._id, email: details?.email }).then(
      (res) => {
        console.log(res);
        if (res?.data) {
          setViewDetails(res?.data);
        }
      }
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <Button
          sx={{
            border: "1px solid",
          }}
          className="text-white hover:text-[#00548E] border-[#00548E] border-2 bg-[#00548E]"
          onClick={() => setState(true)}
        >
          Employee Names
        </Button>
        <DatePickerBlock
          
        ></DatePickerBlock>
      </div>
      <div>
        <EmployeeAttendanceTable
          handleViewEmployeeAttendance={handleViewEmployeeAttendance}
        ></EmployeeAttendanceTable>
      </div>

      <SwipeableDrawer
        anchor="right"
        open={state}
        sx={{ width: 250 }}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
      >
        <EmployeeNameDrawer
          state={state}
          setState={setState}
          data={getEmployeeData}
          isLoading={isLoading}
          isError={isError}
        ></EmployeeNameDrawer>
      </SwipeableDrawer>

      <div className="relative">
        {viewDetails && (
          <AttendanceDetailsModal
            open={open}
            detailsLoading={detailsLoading}
            setOpen={setOpen}
            viewDetails={viewDetails}
          ></AttendanceDetailsModal>
        )}
      </div>
      <Loader isOpen={detailsLoading}></Loader>
    </div>
  );
};

export default EmployeeAttendanceData;
