import baseApi from "../baseApi";

const AddEmployeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewEmployee: builder.query({
      query: () => {
        return {
          url: `/api/admin/employee`,
          method: "GET",
        };
      },
      providesTags:["Attendance"],
    }),
    addNewEmployee: builder.mutation({
      query: (employeeData) => {
        return {
          url: `/api/admin/employee`,
          method: "POST",
          body: employeeData,
        };
      },
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const { useAddNewEmployeeMutation, useGetNewEmployeeQuery } =
  AddEmployeeApi;
