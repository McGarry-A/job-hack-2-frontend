import { savedJobsInterface } from "../../types/UserTypes";

const createColumn = (
    state: savedJobsInterface,
    payload: { title: string; id: string }
  ) => {
    const { title, id } = payload;

    if (Object.keys(state.columns).includes(id)) return state 

    const newState = state
    newState.columnOrder.push(id)
    newState.columns[id] = {
        id: id,
        title: title,
        jobIds: []
    }

    return newState

}

export default createColumn;
