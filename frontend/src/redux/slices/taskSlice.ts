/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  let data;
  try {
    const response = await axios("/api/v1/tasks");
    data = await response.data.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (error: any) {
    return Promise.reject(error.message ? error.message : data?.message);
  }
});
export type Task = null | Record<string, any>;
type taskInitialState = {
  task: Task;
  status: "idle";
  error: string | null;
};
const initialState: taskInitialState = {
  task: null,
  status: "idle",
  error: null,
};
const slice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  // extraReducers:(builder) => {

  // }
});
export const {} = slice.actions;
export default slice.reducer;
