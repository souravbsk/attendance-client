import baseApi from "../api/baseApi";
const AttendanceTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStartTime: builder.mutation({
      query: (data) => ({
        url: "/api/attendance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attendance"],
    }),
    updateFinishedData: builder.mutation({
      query: ({ updateFinisTimeData, startInsertId }) => {
        return {
          url: `/api/attendance/${startInsertId}`,
          method: "PUT",
          body: updateFinisTimeData, // Pass the data object directly
        };
      },
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const { useAddStartTimeMutation, useUpdateFinishedDataMutation } =
  AttendanceTimeApi;
