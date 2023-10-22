"use client";
import MaterialReactTable from "material-react-table";
import React, { useMemo, useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import {
  useDeleteEmployeeMutation,
  useGetNewEmployeeQuery,
} from "@/Redux/Features/api/AdminApi/AddEmployeeApi";
import Image from "next/image";
import { GrUserWorker } from "react-icons/gr";
import { RiAdminFill, RiFileExcel2Fill } from "react-icons/ri";
import Skeleton from "@mui/material/Skeleton";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
const EmployeeListTable = ({ handleViewEmployee, handleEmployeeDetails }) => {
  const { data, isLoading, isError, error } = useGetNewEmployeeQuery();
  const [
    deleteEmployee,
    { isLoading: deleteLoading, isError: isDeleteError, error: deleteError },
  ] = useDeleteEmployeeMutation();

  const handleDeleteEmployee = (employee) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wan't be delete this Employee",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(employee?._id).then((res) => {
          console.log(res);
          if (res?.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Employee has been deleted.", "success");
          }
        });
      }
    });
  };

  const columns = useMemo(() => [
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
            <div className="w-12 rounded-full ring-[#085992] ring  ring-offset-base-100 ring-offset-2">
              <Image alt="" src={row?.image} width={48} height={48} />
            </div>
          </div>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        ),
    },
    {
      header: "Name",
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
          <button
            onClick={() => handleDeleteEmployee(row?.original)}
            className="text-lg px-3 py-3 bg-[#0D64A5] text-white rounded-lg"
          >
            <FaTrash></FaTrash>
          </button>
        </div>
      ),
    },
  ]);

  const exportData = data?.map((person, i) => {
    const accountStatus = person?.isAccount ? "Registered" : "Pending";
    const employee = {
      Id: i + 1,
      Name: person?.name,
      Designation: person?.designation,
      EmployeeID: person?.employeeId,
      AccountStatus: accountStatus,
      Email: person?.email,
      Phone: person?.phone,
      role: person?.role,
    };
    return employee;
  });

  return (
    <div className="rounded-2xl overflow-hidden">
      <MaterialReactTable
        rowNumberMode="original"
        data={data ? data : []}
        columns={columns}
        renderTopToolbarCustomActions={() =>
          data &&
          data?.length > 0 && (
            <CSVLink data={exportData}>
              <button className="rounded-lg text  px-4 py-4 font-semibold mr-2 text-white bg-[#0D64A5]">
                <RiFileExcel2Fill></RiFileExcel2Fill>
              </button>
            </CSVLink>
          )
        }
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
          showProgressBars: isLoading || deleteLoading,
        }}
      ></MaterialReactTable>
    </div>
  );
};

export default EmployeeListTable;
