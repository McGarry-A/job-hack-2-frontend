import { savedJobsInterface } from "../../types/UserTypes";

const removeColumn = (
    state: savedJobsInterface,
    payload: { id: string }
  ) => {
      const { id } = payload;

      const newState = state
      const newColumnOrder = newState.columnOrder.filter((el) => el !== id);
      
      delete newState.columns[id];
      newState.columnOrder = newColumnOrder

      return newState
}

export default removeColumn;
