/** @format */
import { useDispatch as  useAppDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  }
})
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export type RootState = ReturnType<typeof store.getState>;
