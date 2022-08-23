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
      action: PayloadAction<{ title: string; id: string }>
    ) => {
      const { title, id } = action.payload;

      if (Object.keys(state.columns).includes(id)) return state 

      state.columnOrder.push(id)
      state.columns[id] = {
          id: id,
          title: title,
          jobIds: []
      }
    },
    removeColumn: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const newState = state
      const newColumnOrder = newState.columnOrder.filter((el) => el !== id);
      
      delete newState.columns[id];
      newState.columnOrder = newColumnOrder

      return newState
    },
    addJob: (state, action: PayloadAction<{ title: string, company: string, link: string, id: string}>) => {
      const job = action.payload

      if (Object.keys(state.jobs).includes(job.id)) return state
      console.log("adding to list")

      const newState = state
      newState.jobs[job.id] = job
      newState.columns["column-0"].jobIds.push(job.id)

      return newState
    },
    removeJob: (state, action: PayloadAction<{id: string, columnId: string}>) => {
      const { id, columnId } = action.payload;
      const newState = state
      
      delete newState.jobs[id]
      const newColumnJobIds = newState.columns[columnId].jobIds.filter(el => el !== id)
      newState.columns[columnId].jobIds = newColumnJobIds
      
      return newState
    },
  },
});

export const { setJobs, createColumn, removeColumn, addJob, removeJob } = savedJobsSlice.actions;

export default savedJobsSlice;
