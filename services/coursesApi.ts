import {
    BaseQueryFn,
    createApi
} from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig, AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
const axios = require('axios');  

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
    //   return result.data;
      return {data: result.data}
      
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
  export const coursesApi = createApi({
    reducerPath: "courseApi",
    baseQuery: axiosBaseQuery({
      baseUrl: "http://localhost:5001/",
    }),
    extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
        return action.payload[reducerPath];
      }
    },
    tagTypes: ['Course'],
    endpoints: (builder) => ({
        getCourses: builder.query({
          query: () => ({ url: 'courses', method: 'get' }),
          transformResponse: (response) => {
            return response;
          },
          providesTags: ['Course']
        }),
        addCourse: builder.mutation({
          query: (task) => ({
            url: "courses",
            method: "post",
            data: task
          }),
          
          invalidatesTags: ['Course']
        }),
        updateCourse: builder.mutation({
          query: ({ id, ...rest }) => ({
            url: `courses/${id}`,
            method: "put",
            data: rest
          }),
          invalidatesTags: ['Course']
        }),
        deleteCourse: builder.mutation({
          query: (id) => ({
            url: `courses/${id}`,
            method: "delete"
          }),
          invalidatesTags: ['Course']
        })
    })
  });


  export const {
    useGetCoursesQuery,
    useAddCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    util: { getRunningOperationPromises },

  } = coursesApi;
  
  // export endpoints for use in SSR
  export const { getCourses, addCourse, updateCourse, deleteCourse } = coursesApi.endpoints;
