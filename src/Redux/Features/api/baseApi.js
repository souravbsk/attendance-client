import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://attendance-task-server.vercel.app`,
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get("employee-access-token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "Attendance", "Employee", "admin"],
  endpoints: (builder) => ({}),
});

export default baseApi;
