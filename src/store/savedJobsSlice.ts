import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { savedJobsInterface } from "../types/UserTypes";

export interface NotificationInterface {
  state: boolean;
  status: "error" | "success";
  message: string;
}

const initialState: savedJobsInterface = {
  jobs: {},
  columns: {},
  columnOrder: [],
};

const savedJobsSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    setJobs: (_, action: PayloadAction<savedJobsInterface>) => {
      console.log("setting jobs")
      return action.payload;
    },
    createColumn: (
      state,
      action: PayloadAction<savedJobsInterface>
    ) => {
      return action.payload
    },
    removeColumn: (state, action: PayloadAction<savedJobsInterface>) => {
      // const { id } = action.payload;

      // const newState = state
      // const newColumnOrder = newState.columnOrder.filter((el) => el !== id);
      
      // delete newState.columns[id];
      // newState.columnOrder = newColumnOrder

      return action.payload
    },
    addJob: (state, action: PayloadAction<savedJobsInterface>) => {
      return action.payload
    },
    removeJob: (state, action: PayloadAction<savedJobsInterface>) => {
      return action.payload
    },
  },
});

export const { setJobs, createColumn, removeColumn, addJob, removeJob } = savedJobsSlice.actions;

export default savedJobsSlice;
