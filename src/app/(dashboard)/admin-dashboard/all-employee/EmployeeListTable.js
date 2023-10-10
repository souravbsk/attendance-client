"use client";
import MaterialReactTable from "material-react-table";
import React, { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import ViewEmployee from "./ViewEmployee";
import { useGetNewEmployeeQuery } from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import Image from "next/image";
import { GrUserWorker } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import Skeleton from "@mui/material/Skeleton";
const EmployeeListTable = ({ handleViewEmployee, handleEmployeeDetails }) => {
  const { data, isLoading, isError, error } = useGetNewEmployeeQuery();

  console.log(data);

  const columns = [
    {
      header: "#",
      Cell: ({ row }) => row.index + 1,
      size: 50,
    },
    {
      header: "Employee ID",
      accessorKey: "employeeId",
      accessorFn: (row) => row.employeeId,
      size: 50,
    },
    {
      header: "Image",
      accessorKey: "Image",
      size: 50,
      accessorFn: (row) =>
        row?.image ? (
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image alt="" src={row?.image} width={48} height={48} />
            </div>
          </div>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        ),
    },
    {
      header: "name",
      accessorKey: "name",
      size: 150,
    },
    {
      header: "Designation",
      accessorKey: "designation",
      size: 100,
    },
    {
      header: "Role",
      accessorKey: "role",
      size: 50,
      accessorFn: (row) =>
        row?.role === "employee" ? (
          <GrUserWorker size={22}></GrUserWorker>
        ) : row?.role === "admin" ? (
          <RiAdminFill size={22}></RiAdminFill>
        ) : (
          "not found"
        ),
    },
    {
      header: "Account Status",
      accessorKey: "_id",
      size: 50,

      accessorFn: (row) =>
        row?.isAccount ? (
          <div className="badge badge-primary">Registered</div>
        ) : (
          <div className="badge badge-accent">Pending...</div>
        ),
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewEmployee(row?.original)}
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
    <div className="rounded-2xl overflow-hidden">
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
    </div>
  );
};

export default EmployeeListTable;
