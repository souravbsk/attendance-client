"use client";
import Button from "@/components/Button/Button";
import MaterialReactTable from "material-react-table";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
const workHistory = [
  {
    id: 1,
    date: "2023-09-18",
    startWork: "09:00 AM",
    endWork: "05:00 PM",
    totalWork: "8 hours 0 minutes",
    employeeReport: "Employee report for the day.",
    ip: "192.168.1.100",
    location: "Office A",
    day: "Monday",
  },
  {
    id: 2,
    date: "2023-09-19",
    startWork: "08:30 AM",
    endWork: "04:45 PM",
    totalWork: "8 hours 15 minutes",
    employeeReport: "Another employee report.",
    ip: "192.168.1.101",
    location: "Office B",
    day: "Tuesday",
  },
  {
    id: 3,
    date: "2023-09-20",
    startWork: "09:15 AM",
    endWork: "05:30 PM",
    totalWork: "8 hours 15 minutes",
    employeeReport: "Yet another report.",
    ip: "192.168.1.102",
    location: "Office C",
    day: "Wednesday",
  },
  {
    id: 4,
    date: "2023-09-21",
    startWork: "08:45 AM",
    endWork: "04:30 PM",
    totalWork: "7 hours 45 minutes",
    employeeReport: "Report for Wednesday.",
    ip: "192.168.1.103",
    location: "Office A",
    day: "Thursday",
  },
  {
    id: 5,
    date: "2023-09-22",
    startWork: "09:30 AM",
    endWork: "05:15 PM",
    totalWork: "7 hours 45 minutes",
    employeeReport: "Another report for Thursday.",
    ip: "192.168.1.104",
    location: "Office B",
    day: "Friday",
  },
  {
    id: 6,
    date: "2023-09-23",
    startWork: "09:00 AM",
    endWork: "04:45 PM",
    totalWork: "7 hours 45 minutes",
    employeeReport: "Friday's report.",
    ip: "192.168.1.105",
    location: "Office C",
    day: "Saturday",
  },
  {
    id: 7,
    date: "2023-09-24",
    startWork: "09:15 AM",
    endWork: "05:30 PM",
    totalWork: "8 hours 15 minutes",
    employeeReport: "Saturday's report.",
    ip: "192.168.1.106",
    location: "Office A",
    day: "Sunday",
  },
  {
    id: 8,
    date: "2023-09-25",
    startWork: "08:45 AM",
    endWork: "04:30 PM",
    totalWork: "7 hours 45 minutes",
    employeeReport: "Another report for Sunday.",
    ip: "192.168.1.107",
    location: "Office B",
    day: "Monday",
  },
  {
    id: 9,
    date: "2023-09-26",
    startWork: "09:30 AM",
    endWork: "05:15 PM",
    totalWork: "7 hours 45 minutes",
    employeeReport: "Monday's report.",
    ip: "192.168.1.108",
    location: "Office C",
    day: "Tuesday",
  },
  {
    id: 10,
    date: "2023-09-27",
    startWork: "09:00 AM",
    endWork: "04:45 PM",
    totalWork: "7 hours 45 minutes",
    employeeReport: "Another report for Tuesday.",
    ip: "192.168.1.109",
    location: "Office A",
    day: "Wednesday",
  },
];

const EmployeeDataTable = ({handleViewAttendance}) => {
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      header: "Date",
      accessorKey: "date",
      size: "100",
    },
    {
      header: "Day",
      accessorKey: "day",
      size: "100",
    },
    {
      header: "Start",
      accessorKey: "startWork",
      size: "100",
    },
    {
      header: "End",
      accessorKey: "endWork",
      size: "100",
    },
    {
      header: "Total Work",
      accessorKey: "totalWork",
    },

    {
      header: "Ip",
      accessorKey: "ip",
      size: "120",
    },
    {
      header: "location",
      accessorKey: "location",
      size: "120",

    }, 
    {
      header: "Action",
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewAttendance(row?.original)}
            className="text-lg px-3 py-3 bg-[#0D64A5] text-white rounded-lg"
          >
            <FaEye></FaEye>
          </button>
          <button
            onClick={() => handleEmployeeDetails(row?.original)}
            className="text-lg px-3 py-3 bg-[#0D64A5] text-white rounded-lg"
          >
            <FaRegEdit></FaRegEdit>
          </button>
          <button className="text-lg px-3 py-3 bg-[#0D64A5] text-white rounded-lg">
            <FaTrash></FaTrash>
          </button>
        </div>
      ),
    },
  ];


  return (
    <div className="border shrink rounded-2xl my-4">
      <div>
        <MaterialReactTable
          enableColumnFilterModes
          enableColumnOrdering
          enableGrouping
          enablePinning
          initialState={{ showColumnFilters: false }}
          rowNumberMode="original"
          renderTopToolbarCustomActions={() => (
            <CSVLink data={workHistory}>
              <button className="rounded-lg text  px-4 py-4 font-semibold mr-2 text-white bg-[#0D64A5]">
                <RiFileExcel2Fill></RiFileExcel2Fill>
              </button>
            </CSVLink>
          )}
          data={workHistory}
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
  );
};

export default EmployeeDataTable;
