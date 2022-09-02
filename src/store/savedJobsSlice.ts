import { savedJobsInterface } from "../types/UserTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationInterface {
  state: boolean;
  status: "error" | "success";
  message: string;
}

const initialState: savedJobsInterface = localStorage.getItem("jobhack_user") === null ? {
  jobs: {},
  columns: {},
  columnOrder: [],
} : JSON.parse(localStorage.getItem("jobhack_user") as string).savedJobs || null

const savedJobsSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    setJobs: (_, action: PayloadAction<savedJobsInterface>) => {
      const { payload } = action;

      if (localStorage.getItem("jobhack_user") !== null) {
        const oldCache = JSON.parse(localStorage.getItem("jobhack_user") as string)
        const newCache = oldCache
        newCache.savedJobs = payload
        localStorage.setItem("jobhack_user", JSON.stringify(newCache))
      }

      return payload
    }
  },
});

export const { setJobs } = savedJobsSlice.actions;

export default savedJobsSlice;
