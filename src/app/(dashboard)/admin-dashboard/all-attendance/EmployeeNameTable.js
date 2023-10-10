"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MaterialReactTable from "material-react-table";
import { FaEye } from "react-icons/fa";

const employeeData = [
  {
    id: 1,
    EmployeeID: "EMP001",
    Name: "John Doe",
  },
  {
    id: 2,
    EmployeeID: "EMP002",
    Name: "Jane Smith",
  },
  {
    id: 3,
    EmployeeID: "EMP003",
    Name: "Michael Johnson",
  },
  {
    id: 4,
    EmployeeID: "EMP004",
    Name: "Emily Brown",
  },
  {
    id: 5,
    EmployeeID: "EMP005",
    Name: "David Wilson",
  },
  {
    id: 6,
    EmployeeID: "EMP006",
    Name: "Sarah Lee",
  },
  {
    id: 7,
    EmployeeID: "EMP007",
    Name: "Robert Davis",
  },
  {
    id: 8,
    EmployeeID: "EMP008",
    Name: "Jennifer Martinez",
  },
];

const EmployeeNameTable = ({ setState, state }) => {
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      header: "Employee ID",
      accessorKey: "EmployeeID",
      size: "60",
    },
    {
      header: "Name",
      accessorKey: "Name",
      size: "60",
    },

    {
      header: "View Detail",
      size: "80",
      Cell: ({ row }) => (
        <>
          <button className="px-2 py-2 bg-[#0D64A5] font-semibold rounded-2xl text-white"><FaEye></FaEye></button>
        </>
      ),
    },
  ];

  return (
    <>
      <Drawer anchor="right" open={state} onClose={() => setState(false)}>
        <Box sx={{ width: 500 }} role="presentation">
          <div className="">
            <h2 className="text-center text-2xl font-mono font-semibold text-[#0D64A5] mt-12">
              All Employee Name
            </h2>
            <div className="px-5 rounded-md overflow-hidden mt-6">
              <MaterialReactTable
                rowNumberMode="original"
                data={employeeData}
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
                  isLoading,
                }}
              ></MaterialReactTable>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default EmployeeNameTable;
