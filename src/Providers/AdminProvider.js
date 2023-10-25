import AdminRoute from "@/routes/AdminRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import React from "react";

const AdminProvider = ({ children }) => {
  return (
    <PrivateRoute>
      <AdminRoute>{children}</AdminRoute>
    </PrivateRoute>
  );
};

export default AdminProvider;
