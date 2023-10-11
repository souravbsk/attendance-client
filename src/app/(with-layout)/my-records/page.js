import React from "react";
import RecordsTable from "./RecordsTable";

const MyRecords = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-12 text-3xl font-bold text-white mb-12">
        My Working History
      </h1>
      <RecordsTable handleViewAttendance={handleViewAttendance}></RecordsTable>
    </div>
  );
};

export default React.memo(MyRecords);
