import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rickMortyApi } from "../api/rickMorty";
import appReducer from "./slices/app";

export const store = configureStore({
    reducer: {
        app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        rickMortyApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;