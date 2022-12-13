import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { request, gql, ClientError } from "graphql-request";

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      console.log(baseUrl);
      console.log(body);
      const result = await request(baseUrl, body);
      console.log(result);

      return { data: result };
    } catch (error) {
      console.log(error);
      if (error instanceof ClientError) {
        console.log()
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const articlesApi = createApi({
  reducerPath: "articleApi",
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        body: gql`
        query {
          allArticles { 
              description
              id
              title
          }
        }
        `,
        invalidatesTags: ['Article'],
      }),
      
      transformResponse: (response) => {
        console.log("response.data.articles", response);
        return response.allArticles;
      },
    }),
    // addArticle: builder.mutation({
    //   query: (task) => ({
    //     url: "/articles",
    //     method: "POST",
    //     body: task
    //   }),
    //   invalidatesTags: ['Article']
    // }),
    // updateArticle: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/articles/${id}`,
    //     method: "PUT",
    //     body: rest
    //   }),
    //   invalidatesTags: ['Article']
    // }),
    // deleteArticle: builder.mutation({
    //   query: (id) => ({
    //     url: `/articles/${id}`,
    //     method: "DELETE"
    //   }),
    //   invalidatesTags: ['Article']
    // })
  }),
});

export const {
  useGetArticlesQuery,
  // useAddArticleMutation,
  // useUpdateArticleMutation,
  // useDeleteArticleMutation,
  util: { getRunningMutationThunk, getRunningQueriesThunk },

} = articlesApi;

// export endpoints for use in SSR
export const { getArticles } = articlesApi.endpoints;
