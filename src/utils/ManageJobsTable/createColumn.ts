import { savedJobsInterface } from "../../types/UserTypes";

export const createColumn = (
    state: savedJobsInterface,
    payload: { title: string; id: string }
  ) => {
    const { title, id } = payload;

    if (Object.keys(state.columns).includes(id)) return state 

    const newState = JSON.parse(JSON.stringify(state))
    
    newState.columnOrder.push(id)
    newState.columns[id] = {
        id: id,
        title: title,
        jobIds: []
    }

    return newState

}
