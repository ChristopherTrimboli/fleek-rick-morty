import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Info {
    count: number;
    next: string;
    pages: number;
    prev: number;
}

interface Location {
    name: string;
    url: string;
}

export interface Character {
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

interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export const rickMortyApi = createApi({
    reducerPath: "rickMortyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
    endpoints: (builder) => ({
        getCharacters: builder.query<{ info: Info, results: Character[] }, { page: number }>({
            query: ({ page }) => ({
                url: `character/?page=${page || 1}`,
                method: "GET"
            })
        }),
        getCharacter: builder.query<Character, { characterId: number }>({
            query: ({ characterId }) => ({
                url: `character/${characterId}`,
                method: "GET"
            })
        }),
        getEpisode: builder.query<Episode, { episodeId: number }>({
            query: ({ episodeId }) => ({
                url: `episode/${episodeId}`,
                method: "GET"
            })
        }),
    })
});

export const {
    useGetCharactersQuery,
    useGetCharacterQuery,
    useGetEpisodeQuery
} = rickMortyApi;