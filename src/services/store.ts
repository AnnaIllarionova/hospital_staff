import { configureStore } from "@reduxjs/toolkit";
import { staffApi } from "./api";

export const store = configureStore({
  reducer: {
    [staffApi.reducerPath]: staffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(staffApi.middleware),
});
