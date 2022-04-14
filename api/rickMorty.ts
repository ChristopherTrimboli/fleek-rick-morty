import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Location {
    name: string;
    url: string;
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export const rickMortyApi = createApi({
    reducerPath: "rickMortyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
    endpoints: (builder) => ({
        getCharacters: builder.query<Character[], { page: number }>({
            query: ({ page }) => ({
                url: `character/?page/${page || 1}`,
                method: "GET"
            })
        }),
    })
});

export const { useGetCharactersQuery } = rickMortyApi;