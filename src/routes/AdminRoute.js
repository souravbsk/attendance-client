"use client";
import { useGetIsAdminQuery } from "@/Redux/Features/api/AdminApi/IsAdminApi";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const AdminRoute = ({ children }) => {
  const {
    user,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useSelector((state) => state?.userSlice);
  const { data, isLoading, isError } = useGetIsAdminQuery(user?.email);
  const router = useRouter();

  if (isLoading || isAuthLoading) {
    return <div>Loading..........</div>;
  }

  if (user && data?.admin) {
    return <>{children}</>;
  }
  return router.push("/");
};

export default AdminRoute;
