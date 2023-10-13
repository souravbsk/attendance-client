import baseApi from "../api/baseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchJWT: builder.mutation({
      query: (logUser) => ({
        url: "/api/jwt",
        method: "POST",
        body: logUser,
      }),
      invalidatesTags: ["Users"],
    }),
    checkUserExist: builder.mutation({
      query:(email) => ({
        url: `/api/usersexist/${email}`,
        method: "POST",
      })
    }),
    signUpUser: builder.mutation({
      query: (newUser) => ({
        url: "/api/users",
        method: "PUT",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useFetchJWTMutation, useSignUpUserMutation,useCheckUserExistMutation } = userApi;
