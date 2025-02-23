import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@shared/config";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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

export const { useFavoriteArticleMutation } = likeApi;
