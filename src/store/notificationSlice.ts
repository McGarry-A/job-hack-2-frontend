import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationInterface {
    state: boolean;
    status: "error" | "success";
    message: string;
}

const initialState: NotificationInterface = {
    state: true,
    status: "error",
    message: ""
}

const notificationSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setNotification: (state: NotificationInterface, action: PayloadAction<NotificationInterface>) => {
            return state = action.payload
        },
        removeNotification: (state: NotificationInterface) => {
            return state = initialState
        }
    }
    })

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice