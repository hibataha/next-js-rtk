import {
    createApi,
    fetchBaseQuery
  } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
const fetch = require("isomorphic-fetch");
  export const postApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:5000/",
    }),
    extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
        return action.payload[reducerPath];
      }
    },
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query({
          query: () => `posts/`,
          providesTags: ['Post']
        }),
        addPost: builder.mutation({
          query: (task) => ({
            url: "/posts",
            method: "POST",
            body: task
          }),
          invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
          query: ({ id, ...rest }) => ({
            url: `/posts/${id}`,
            method: "PUT",
            body: rest
          }),
          invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
          query: (id) => ({
            url: `/posts/${id}`,
            method: "DELETE"
          }),
          invalidatesTags: ['Post']
        })
    })
  });


  export const {
    useGetPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    util: { getRunningOperationPromises },

  } = postApi;
  
  // export endpoints for use in SSR
  export const { getPosts, addPost, updatePost, deletePost } = postApi.endpoints;
