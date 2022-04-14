import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickMortyApi = createApi({
    reducerPath: "rickMortyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
    endpoints: (builder) => ({

    })
});

export const { } = rickMortyApi;