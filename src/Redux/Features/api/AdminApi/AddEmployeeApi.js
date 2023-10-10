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
      providesTags: ["Employee"],
    }),
    addNewEmployee: builder.mutation({
      query: (employeeData) => {
        return {
          url: `/api/admin/employee`,
          method: "POST",
          body: employeeData,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({ updateEmployeeData, employeeId }) => {
        return {
          url: `/api/admin/employee/${employeeId}`,
          method: "PUT",
          body: updateEmployeeData, // Pass the data object directly
        };
      },
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => {
        return {
          url: `/api/admin/employee/${employeeId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useAddNewEmployeeMutation,
  useGetNewEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = AddEmployeeApi;
