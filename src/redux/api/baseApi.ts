
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "https://project-bismillah-backend.vercel.app/api/v1" }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
