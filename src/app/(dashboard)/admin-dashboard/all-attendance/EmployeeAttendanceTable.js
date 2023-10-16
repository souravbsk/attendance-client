import useFormatTimeWorked from "@/Hooks/useFormatTimeWorked";
import { useGetEmployeeAttendanceQuery } from "@/Redux/Features/api/AdminApi/EmployeeAttendanceApi";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const EmployeeAttendanceTable = () => {
  const { attendanceEmail } = useSelector((state) => state?.attendanceSlice);
  const { data, isLoading, isError } =
    useGetEmployeeAttendanceQuery(attendanceEmail);

  const TotalWorkColumn = ({ row }) => {
    const formattedTime = useFormatTimeWorked(row?.totalWork);

    return formattedTime;
  };
  const columns = [
    {
      header:"#",
      size: 30,
      accessorFn: (row,i) => i+1,
    },
    {
      header: "Date",
      size: 50,
      accessorFn: (row) => moment(row.date).format("D-M-YYYY"),
    },
    {
      header: "Email",
      accessorFn: (row) => row?.email,
      size: 100,
    },
    {
      header: "Day",
      accessorKey: "day",
      size: 80,
    },
    {
      header: "Start Time",
      accessorKey: "startTime",
      size: 100,
    },
    {
      header: "End Time",
      accessorKey: "endTime",
      size: 100,
    },
    {
      header: "Total Work",
      size: 100,
      accessorFn: (row) => <TotalWorkColumn row={row} />,
    },

    {
      header: "Start Ip",
      size: 100,

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

  const exportData = data?.map((row,i) => {
    const workTime = TotalWorkColumn({row});
    const employeeData = {
      Id: i+1,
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

export default EmployeeAttendanceTable;