import { savedJobsInterface } from "../../types/UserTypes";

const removeJob = (
    jobsState: savedJobsInterface,
    payload: { id: string, columnId: string }
  ) => {
      const { id, columnId } = payload;
      const newState = jobsState
      
      delete newState.jobs[id]
      const newColumnJobIds = newState.columns[columnId].jobIds.filter(el => el !== id)
      newState.columns[columnId].jobIds = newColumnJobIds
      
      return newState
};

export default removeJob