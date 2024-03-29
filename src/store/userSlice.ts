import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateInterface } from "../types/UserTypes";

export interface JobInterface {
    title: string;
    company: string;
    location: string;
    salary: number;
}

const initialState: UserStateInterface = localStorage.getItem("jobhack_user") === null ? {
    isLoggedIn: false,
    user: {
        firstName: "",
        lastName: "",
        email: ""
    } 
} : JSON.parse(localStorage.getItem("jobhack_user") as string) 

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setActiveUser: (state: UserStateInterface, action: PayloadAction<UserStateInterface>) => {
            return state = {
                isLoggedIn: true,
                user: {
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email
                },
            }
        },
        removeActiveUser: (state: UserStateInterface) => {
            return state = {
                isLoggedIn: false,
                user: {
                    firstName: "",
                    lastName: "",
                    email: ""
                },
            }
            
        },
    }
})

export const { 
        setActiveUser, 
        removeActiveUser, 
     } = userSlice.actions

export default userSlice