import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
});
interface IUser {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

interface IAllUsers {
  data: IUser[];
  page: number
  per_page: number
  support: {
    url: string
    text: string
  };
  total: number
  total_pages: number
}
export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllStaff: builder.query<IAllUsers, number>({
      query: ( page: number ) => `https://reqres.in/api/users?${page}&per_page=8`,
    }),
  }),
});

export const { useGetAllStaffQuery } = staffApi;
