"use client";
import useFormatTimeWorked from "@/Hooks/useFormatTimeWorked";
import { useGetUserWorkQuery } from "@/Redux/Features/api/WorkHistoryApi";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FaEye } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const RecordsTable = ({ handleViewAttendance }) => {
  const { user } = useSelector((state) => state?.userSlice);

  const { data, isLoading, isError, error } = useGetUserWorkQuery(user.email);

  console.log(data);

  const TotalWorkColumn = ({ row }) => {
    const formattedTime = useFormatTimeWorked(row?.totalWork);

    return formattedTime;
  };
  const columns = [
    {
      header: "Date",
      accessorFn: (row) => moment(row.date).format("D-M-YYYY"),
    },
    {
      header: "Day",
      accessorKey: "day",
    },
    {
      header: "Start Time",
      accessorKey: "startTime",
    },
    {
      header: "End Time",
      accessorKey: "endTime",
    },
    {
      header: "Total Work",
      // accessorKey: "totalWork",
      accessorFn: (row) => <TotalWorkColumn row={row} />,
    },

    {
      header: "Start Ip",
      // accessorKey: "ip",
      accessorFn: (row) => row?.trackingDetails?.providerDetails?.query,
    },
    {
      header: "Start location",
      accessorFn: (row) => (
        <div className="w-full">
          {row?.trackingDetails?.addressDetails?.city}, 
          {row?.trackingDetails?.addressDetails?.county}, 
          {row?.trackingDetails?.addressDetails?.postcode}
        </div>
      ),
    },
  ];

  const exportData = data?.map((row) => {
    const workTime = TotalWorkColumn(row);
    const employeeData = {
      Date: moment(row.date).format("D-M-YYYY"),
      Day: row.day,
      StartTime: row?.startTime,
      EndTime: row?.endTime,
      TotalWork: workTime,
      email: row?.email,
      StartIp: row?.trackingDetails?.providerDetails?.query,
      StartLocation: row?.trackingDetails?.addressDetails?.county,
    };
    return employeeData;
  });

  return (
    <div className="border rounded-2xl overflow-hidden my-4">
      <div>
        <MaterialReactTable
          rowNumberMode="original"
          data={data ? data : []}
          columns={columns}
          renderTopToolbarCustomActions={() =>
            data &&
            data.length > 0 && (
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
            showProgressBars: isLoading,
          }}
        ></MaterialReactTable>
      </div>
    </div>
  );
};

export default RecordsTable;
