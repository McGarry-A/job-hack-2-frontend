import { savedJobsInterface } from "../../types/UserTypes";

export const addJob = (
    jobsState: savedJobsInterface,
    jobToAdd: { title: string; company: string; id: string; link: string }
  ) => {
    if (Object.keys(jobsState.jobs).includes(jobToAdd.id)) return jobsState;

    // DEEP COPYING STATE
    const newState = JSON.parse(JSON.stringify(jobsState));
    
    newState.jobs[jobToAdd.id] = jobToAdd;
    newState.columns["column-0"].jobIds.push(jobToAdd.id);

    return newState;
};