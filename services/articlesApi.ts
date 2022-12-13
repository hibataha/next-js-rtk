import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { request, gql, ClientError } from "graphql-request";

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
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
       
      }),
      providesTags: ['Article'],
      transformResponse: (response) => {
        return response.allArticles;
      },
    }),
    addArticle: builder.mutation({
      query: (article) => ({
        body: gql`
        mutation MyMutation {
          createArticle (title: "${article.title}", description: "${article.description}")
          {
            id
            title
            description
          }
        }
        `,
      }),
      invalidatesTags: ['Article'],
      transformResponse: (response) => {
        return response;
      },
    }),

    updateArticle: builder.mutation({
      query: (article) => ({
        body: gql`
        mutation MyMutation {
          updateArticle (id: ${article.id}, title: "${article.title}", description: "${article.description}")
          {
            id
            title
            description
          }
        }
        `,
      }),
      invalidatesTags: ['Article'],
      transformResponse: (response) => {
        return response;
      },
    }),

    deleteArticle: builder.mutation({
      query: (id) => ({
        body: gql`
        mutation MyMutation {
          removeArticle (id:${id})
          {
            id
            title
            description
          }
        }
        `,
      }),
      invalidatesTags: ['Article'],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});


export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  util: { getRunningMutationThunk, getRunningQueriesThunk },
} = articlesApi;

// export endpoints for use in SSR
export const { getArticles } = articlesApi.endpoints;
