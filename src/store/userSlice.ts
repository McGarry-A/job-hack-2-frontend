import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInterface {
    isLoggedIn: boolean;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    savedJobs: {
        likedJobs: JobInterface[];
        appliedJobs: JobInterface[];
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
        likedJobs: [],
        appliedJobs: []
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
                    likedJobs: [],
                    appliedJobs: [],
                }
            }
        },
        removeActiveUser: (state: userInterface, action: PayloadAction<{type: string}>) => {
            if (action.type === "LOGOUT") {
                return state = initialState
            }
        },
        addToLikedJobs: (state: userInterface, action: PayloadAction<JobInterface>) => {
            return state = {
                ...state,
                savedJobs: {
                    ...state.savedJobs,
                    likedJobs: [

                        ...state.savedJobs.likedJobs,
                        action.payload
                    ]
                }
            }
        },
        addToAppliedJobs: (state: userInterface, action: PayloadAction<JobInterface>) => {
            return state = {
                ...state,
                savedJobs: {
                    ...state.savedJobs,
                    appliedJobs: {
                        ...state.savedJobs.appliedJobs,
                        ...action.payload
                    }
                }
            }
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