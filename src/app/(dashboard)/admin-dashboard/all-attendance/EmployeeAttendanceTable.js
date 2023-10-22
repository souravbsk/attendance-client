"use client";
import useFormatTimeWorked from "@/Hooks/useFormatTimeWorked";
import { useGetEmployeeAttendanceQuery } from "@/Redux/Features/api/AdminApi/EmployeeAttendanceApi";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { FaEye } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const EmployeeAttendanceTable = ({ handleViewEmployeeAttendance }) => {
  const { attendanceEmail, endDate, startDate } = useSelector(
    (state) => state?.attendanceSlice
  );
  console.log(attendanceEmail);
  const { data, isLoading, isError, error } = useGetEmployeeAttendanceQuery({
    email: attendanceEmail,
    fromDate: startDate,
    toDate: endDate,
  });

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setAllData(data);
    }
  }, [data, isLoading, isError]);

  const TotalWorkColumn = ({ row }) => {
    const formattedTime = useFormatTimeWorked(row?.totalWork);

    return formattedTime;
  };
  const columns = useMemo(() => [
    {
      header: "#",
      size: 30,
      accessorFn: (row, i) => i + 1,
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
    {
      header: "Details",
      accessorFn: (row) => (
        <button
          onClick={() => handleViewEmployeeAttendance(row)}
          className="text-lg px-3 py-3 bg-[#0D64A5] text-white rounded-lg"
        >
          <FaEye></FaEye>
        </button>
      ),
    },
  ]);

  const exportData = allData?.map((row, i) => {
    const workTime = TotalWorkColumn({ row });
    const employeeData = {
      Id: i + 1,
      Date: moment(row.date).format("D-M-YYYY"),
      Day: row.day,
      StartTime: row?.startTime,
      EndTime: row?.endTime,
      TotalWork: workTime,
      email: row?.email,
      StartIp: row?.trackingDetails?.providerDetails?.query,
      StartLocation:
        row?.trackingDetails?.addressDetails?.city +
        "," +
        row?.trackingDetails?.addressDetails?.county +
        "," +
        row?.trackingDetails?.addressDetails?.state_district +
        "," +
        row?.trackingDetails?.addressDetails?.state +
        "," +
        row?.trackingDetails?.addressDetails?.postcode +
        "," +
        row?.trackingDetails?.addressDetails?.country +
        ",",
    };
    return employeeData;
  });

  return (
    <div className="border rounded-2xl overflow-hidden my-4">
      <div>
        <MaterialReactTable
          rowNumberMode="original"
          data={allData ? allData : []}
          columns={columns}
          renderTopToolbarCustomActions={() => (
            <>
              {allData && allData.length > 0 && (
                <CSVLink data={exportData}>
                  <button className="rounded-lg text  px-4 py-4 font-semibold mr-2 text-white bg-[#0D64A5]">
                    <RiFileExcel2Fill></RiFileExcel2Fill>
                  </button>
                </CSVLink>
              )}
              <h2 className="text-center text-[#0D64A5] md:text-xl  font-semibold">
                Attendance History
              </h2>
            </>
          )}
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
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: "error",
                  children: "data could not fetch",
                }
              : undefined
          }
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
