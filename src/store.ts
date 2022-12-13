import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { articlesApi } from "../services/articlesApi";
import { coursesApi } from "../services/coursesApi";
import { postApi } from "../services/postApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [postApi.reducerPath]: postApi.reducer,
      [articlesApi.reducerPath]: articlesApi.reducer,
      [coursesApi.reducerPath]: coursesApi.reducer
    },
    middleware: (gDM) => gDM().concat(thunk,articlesApi.middleware, postApi.middleware, coursesApi.middleware),
  });



export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
