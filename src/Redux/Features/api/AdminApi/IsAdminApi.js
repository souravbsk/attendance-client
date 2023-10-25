import baseApi from "../baseApi";

const IsAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIsAdmin: builder.query({
      query: (email) => {
        return {
          url: `/api/users/admin/${email}`,
          method: "GET",
        };
      },
      providesTags: ["Employee"],
    }),
  }),
});

export const { useGetIsAdminQuery } = IsAdminApi;
