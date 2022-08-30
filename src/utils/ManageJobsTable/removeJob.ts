import { savedJobsInterface } from "../../types/UserTypes";

export const removeJob = (
    jobsState: savedJobsInterface,
    payload: { id: string, columnId: string }
  ) => {
      const { id, columnId } = payload;
      const newState = JSON.parse(JSON.stringify(jobsState));
      
      delete newState.jobs[id]
      const newColumnJobIds = newState.columns[columnId].jobIds.filter((el: string) => el !== id)
      newState.columns[columnId].jobIds = newColumnJobIds
      
      return newState
};
