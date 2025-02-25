import blogApi from "@shared/lib/api";

const authSliceAPI = blogApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user",
      }),
    }),
    login: builder.mutation({
      query: (user: { email: string; password: string }) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    register: builder.mutation({
      query: (data: {
        user: { email: string; password: string; username: string };
      }) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useLoginMutation, useRegisterMutation } =
  authSliceAPI;
