"use client";
import { useState } from "react";

import EmployeeNameDrawer from "./EmployeeNameDrawer";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useGetEmployeeNamesQuery } from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";

const EmployeeAttendanceData = () => {
  const { data, isLoading, isError } = useGetEmployeeNamesQuery();
  const { isViewModalOpen, setViewModalIsOpen } = useState(false);

  const [state, setState] = useState(false);
  return (
    <div>
      <div>
        <Button
          sx={{
            border: "1px solid",
          }}
          className="text-white hover:text-[#00548E] border-[#00548E] border-2 bg-[#00548E]"
          onClick={() => setState(true)}
        >
          Employee Names
        </Button>
      </div>
      <div>
        <EmployeeAttendanceTable
          setViewModalIsOpen={setViewModalIsOpen}
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
          data={data}
          isLoading={isLoading}
          isError={isError}
        ></EmployeeNameDrawer>
      </SwipeableDrawer>
    </div>
  );
};

export default EmployeeAttendanceData;
