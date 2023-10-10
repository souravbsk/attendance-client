import baseApi from "./baseApi";

const WorkHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserWork: builder.query({
      query: (email) => {
        return {
          url: `/api/attendance/${email}`,
          method: "GET",
        };
      },
      providesTags: ["Attendance"],
    }),
  }),
});

export const { useGetUserWorkQuery } = WorkHistoryApi;
