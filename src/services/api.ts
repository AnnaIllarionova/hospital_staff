import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAllUsers, IUserData } from "../interfaces/interfaces";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllStaff: builder.query<IAllUsers, number>({
      query: (page: number) =>
        `https://reqres.in/api/users?page=${page}&per_page=8`,
    }),
    getUser: builder.query<IUserData, number>({
      query: (id: number) => `https://reqres.in/api/users/${id}`,
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `https://reqres.in/api/users/${id}`,
        method: "DELETE",
      }),
    }),
    addUser: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `https://reqres.in/api/users/${id}`,
        method: "PUT",
      }),
    }),
    editUser: builder.mutation<void, number>({
      query: ( id : number) => ({
        url: `https://reqres.in/api/users/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useEditUserMutation,
} = staffApi;
