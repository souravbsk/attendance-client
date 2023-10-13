import baseApi from "../baseApi";

const EmployeeAttendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeAttendance: builder.query({
      query: (email) => {
        return {
          url: `/api/admin/attendance?email=${email}`,
          method: "GET",
        };
      },
      providesTags: ["Employee"],
    }),
    
  }),
});

export const {
useGetEmployeeAttendanceQuery
} = EmployeeAttendanceApi;
