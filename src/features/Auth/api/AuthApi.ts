import blogApi from "@shared/lib/api";

const authSliceAPI = blogApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/user",
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery } = authSliceAPI;
