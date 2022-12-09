import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { postApi } from "../services/postApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [postApi.reducerPath]: postApi.reducer
    },
    middleware: (gDM) => gDM().concat(postApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
