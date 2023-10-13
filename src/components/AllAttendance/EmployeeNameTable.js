'use client'
import MaterialReactTable from 'material-react-table';
import React from 'react';
import { CSVLink } from 'react-csv';
import { RiFileExcel2Fill } from 'react-icons/ri';

const EmployeeNameTable = () => {
    return (
        <div className="rounded-2xl overflow-hidden">
        <MaterialReactTable
          rowNumberMode="original"
        //   data={data ? data : []}
        //   columns={columns}
        //   renderTopToolbarCustomActions={() =>
        //     data &&
        //     data?.length > 0 && (
        //       <CSVLink data={exportData}>
        //         <button className="rounded-lg text  px-4 py-4 font-semibold mr-2 text-white bg-[#0D64A5]">
        //           <RiFileExcel2Fill></RiFileExcel2Fill>
        //         </button>
        //       </CSVLink>
        //     )
        //   }
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
        //   state={{
        //     showAlertBanner: isError,
        //     showProgressBars: isLoading || deleteLoading,
        //   }}
        ></MaterialReactTable>
      </div>
    );
};

export default EmployeeNameTable;