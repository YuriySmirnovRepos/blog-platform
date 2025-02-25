//get current user data api using RTKQ inject
import blogApi from "@shared/lib/api";

const userSliceAPI = blogApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (token: string) => ({
        url: "/user",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }),
    }),
    // login: builder.mutation({
    //   query: (user: { email: string; password: string }) => ({
    //     url: "/users/login",
    //     method: "POST",
    //     body: user,
    //   }),
    // }),
    // register: builder.mutation({
    //   query: (user: { email: string; password: string; username: string }) => ({
    //     url: "/users",
    //     method: "POST",
    //     body: user,
    //   }),
    // }),
  }),
});
export const { useGetMeQuery } = userSliceAPI;
