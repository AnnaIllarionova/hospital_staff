import { configureStore } from "@reduxjs/toolkit";
import { staffApi } from "./api";
import usersSlice from "./slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
    [staffApi.reducerPath]: staffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(staffApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)

export type CommonState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
