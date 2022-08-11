import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { savedJobsInterface } from "../types/UserTypes";

export interface NotificationInterface {
  state: boolean;
  status: "error" | "success";
  message: string;
}

const initialState: savedJobsInterface = {
  jobs: {
    cc1: {
      title: "Business development manager",
      company: "cleancloud",
      id: "cc1",
      link: "www.cleancloudapp.com",
    },
    jd0: {
      title: "Sales Assistant",
      company: "JD",
      id: "jd0",
      link: "www.jdsports.com",
    },
  },
  columns: {
    "column-0": {
      id: "column-0",
      jobIds: ["cc1", "jd0"],
      title: "Saved jobs",
    },
  },
  columnOrder: ["column-0"],
};

const savedJobsSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<savedJobsInterface>) => {
      return action.payload;
    },
    createColumn: (
      state,
      action: PayloadAction<{ title: string; id: string }>
    ) => {
      const { title, id } = action.payload;

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
      console.log("adding to list")

      const newState = state
      newState.jobs[job.id] = job
      newState.columns["column-0"].jobIds.push(job.id)

      return newState
    },
    removeJob: (state, action: PayloadAction<{id: string}>) => {
      const { id } = action.payload

      state.columnOrder.map(el => {
        if (state.columns[el].jobIds.includes(id)) {
          return state.columns[el].jobIds.filter(el => el === id)
        }

        return el
      })

      delete state.jobs[id]
    },
  },
});

export const { setJobs, createColumn, removeColumn, addJob } = savedJobsSlice.actions;

export default savedJobsSlice;
