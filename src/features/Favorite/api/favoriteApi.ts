import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    favoriteArticle: builder.mutation({
      query: (slug: string) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      transformResponse: (response: { article: any }) => response.article,
    }),
  }),
});

export const { useFavoriteArticleMutation } = api;
