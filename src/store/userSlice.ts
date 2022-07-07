import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInterface {
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
        setActiveCustomer: (state: userInterface, action: PayloadAction<userInterface>) => {
            return state
        },
        removeActiveCustomer: (state: userInterface, action: PayloadAction<string>) => {
            return state
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
        setActiveCustomer, 
        removeActiveCustomer, 
        addToAppliedJobs, 
        addToLikedJobs
     } = userSlice.actions
     
export default userSlice