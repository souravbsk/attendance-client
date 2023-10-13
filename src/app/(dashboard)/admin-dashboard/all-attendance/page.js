"use client";
import { useState } from "react";

import EmployeeNameDrawer from "./EmployeeNameDrawer";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useGetEmployeeNamesQuery } from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";

const AllAttendance = () => {
  const { data, isLoading, isError } = useGetEmployeeNamesQuery();
  const { isViewModalOpen, setViewModalIsOpen } = useState(false);

  const [state, setState] = useState(false);
  return (
    <div className="container">
      <h2 className="text-center text-2xl font-mono font-semibold text-[#0D64A5] mt-12">
        All Attendance
      </h2>
      <div>
        <Button onClick={() => setState(true)}>right</Button>
      </div>
      <div>
        <EmployeeAttendanceTable
          setViewModalIsOpen={setViewModalIsOpen}
        ></EmployeeAttendanceTable>
      </div>
      <div></div>

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
          data={data}
          isLoading={isLoading}
          isError={isError}
        ></EmployeeNameDrawer>
      </SwipeableDrawer>
    </div>
  );
};

export default AllAttendance;
