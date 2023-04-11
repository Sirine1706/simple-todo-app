/** @format */
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {reducer as userReducer} from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();
