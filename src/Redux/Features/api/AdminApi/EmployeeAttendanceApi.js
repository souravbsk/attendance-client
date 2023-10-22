import baseApi from "../baseApi";

const EmployeeAttendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeAttendance: builder.query({
      query: ({ email, fromDate, toDate }) => {
        return {
          url: `/api/admin/attendance?email=${email}&fromDate=${fromDate}&toDate=${toDate}`,
          method: "GET",
        };
      },
      providesTags: ["Attendance"],
    }),
    getEmployeeAttendanceDetails: builder.mutation({
      query: ({ id, email }) => {
        return {
          url: `/api/admin/attendance/${id}?email=${email}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetEmployeeAttendanceQuery,
  useGetEmployeeAttendanceDetailsMutation,
} = EmployeeAttendanceApi;
