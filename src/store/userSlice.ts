import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInterface {
    isLoggedIn: boolean;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    savedJobs: {
        liked: JobInterface[];
        applied: JobInterface[];
    },
}

export interface JobInterface {
    title: string;
    company: string;
    location: string;
    salary: number;
}

const initialState: userInterface = {
    isLoggedIn: false,
    user: {
        firstName: "",
        lastName: "",
        email: ""
    },
    savedJobs: {
        liked: [],
        applied: []
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setActiveUser: (state: userInterface, action: PayloadAction<userInterface>) => {
            return state = {
                isLoggedIn: true,
                user: {
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email
                },
                savedJobs: {
                    liked: [],
                    applied: [],
                }
            }
        },
        removeActiveUser: (state: userInterface, action: PayloadAction<string>) => {
            if (action.payload === "LOGOUT") {
                return state = initialState
            }
        },
        addToLikedJobs: (state: userInterface, action: PayloadAction<JobInterface>) => {
            return state
        },
        addToAppliedJobs: (state: userInterface, action: PayloadAction<JobInterface>) => {
            return state
        }
    }
})

export const { 
        setActiveUser, 
        removeActiveUser, 
        addToAppliedJobs, 
        addToLikedJobs
     } = userSlice.actions

export default userSlice