import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { articlesApi } from "../services/articlesApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      //[postApi.reducerPath]: postApi.reducer,
      [articlesApi.reducerPath]: articlesApi.reducer
    },
    middleware: (gDM) => gDM().concat(thunk,articlesApi.middleware),
  });


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
