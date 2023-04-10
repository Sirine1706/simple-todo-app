/** @format */

import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

type UserResult = {
  name: string;
  email: string;
  password: string;
  _id: string;
};
type UserState = {
  user: UserResult;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
const initialState: UserState = {
  user: {} as UserResult,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  let data;
  try {
    const response = await axios.get(`/api/v1/users/me`);
    data = await response.data;
    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err: any) {
    console.log(err);
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = "succeeded";
      state.user = action.payload.data.user;
    });
    builder.addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const reducer = userSlice.reducer;

export default userSlice;
