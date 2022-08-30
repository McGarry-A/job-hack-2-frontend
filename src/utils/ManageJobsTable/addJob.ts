import { savedJobsInterface } from "../../types/UserTypes";

export const addJob = (
    jobsState: savedJobsInterface,
    jobToAdd: { title: string; company: string; id: string; link: string }
  ) => {
    if (Object.keys(jobsState.jobs).includes(jobToAdd.id)) return jobsState;
    console.log(jobsState)
    console.log(jobToAdd)
    const newState = jobsState;
    newState.jobs[jobToAdd.id] = jobToAdd;
    newState.columns["column-0"].jobIds.push(jobToAdd.id);

    return newState;
};