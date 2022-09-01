import { savedJobsInterface } from "../../types/UserTypes";

export const removeColumn = (
    state: savedJobsInterface,
    payload: { id: string }
  ) => {
      const { id } = payload;

      const newState = JSON.parse(JSON.stringify(state))
      const newColumnOrder = newState.columnOrder.filter((el: string) => el !== id);
      
      delete newState.columns[id];
      newState.columnOrder = newColumnOrder

      return newState
}