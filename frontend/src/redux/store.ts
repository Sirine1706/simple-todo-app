/** @format */
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();
