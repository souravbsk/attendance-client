import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { FaEye } from "react-icons/fa";
import MaterialReactTable from "material-react-table";
import { useDispatch } from "react-redux";
import { setAttendanceEmail } from "@/Redux/Features/AttendanceSlice/AttendanceSlice";

const EmployeeNameDrawer = ({ setState, state, data, isLoading, isError }) => {
  const dispatch = useDispatch();

  const handleAttendanceDetails = (row) => {
    dispatch(setAttendanceEmail(row?.original?.email));
    setState(false);
  };

  const columns = useMemo(() => [
    {
      header: "Employee ID",
      accessorFn: (row) => row.employeeId,
      size: 50,
    },
    {
      header: "name",
      accessorKey: "name",
      size: 50,
    },
    {
      header: "Action",
      size: 50,

      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAttendanceDetails(row)}
            className="text-lg px-3 py-3 bg-[#0D64A5] text-white rounded-lg"
          >
            <FaEye></FaEye>
          </button>
        </div>
      ),
    },
  ]);

  return (
    <Box
      sx={{
        width: 400, // Set the desired width of the drawer
        padding: "16px", // Add padding to the content for spacing
      }}
      role="presentation"
    >
      {/* Replace this placeholder content with your actual content */}
      <MaterialReactTable
        rowNumberMode="original"
        data={data ? data : []}
        columns={columns}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: "#ADD8E6",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: "#00548E",
            color: "white",
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor: "#ADD8E6",
          },
        }}
        state={{
          showAlertBanner: isError,
          showProgressBars: isLoading,
        }}
      ></MaterialReactTable>
    </Box>
  );
};

export default EmployeeNameDrawer;
