import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateInterface } from "../types/UserTypes";

export interface JobInterface {
    title: string;
    company: string;
    location: string;
    salary: number;
}

const initialState: UserStateInterface = {
    isLoggedIn: false,
    user: {
        firstName: "",
        lastName: "",
        email: ""
    },
    savedJobs: {
        jobs: {
            "cleancloud": {
                title: "Business development manager",
                company: "cleancloud",
                id: "cc1",
                link: "www.cleancloudapp.com"
            },
            "JD": {
                title: "Sales Assistant",
                company: "JD",
                id: "jd0",
                link: "www.jdsports.com"
            }
        },
        columns: {
            "column-0": {
                id: "column-0",
                jobIds: ["cc1", "jd0"],
                title: "Saved jobs"
            }
        },
        columnOrder: ["column-0"]
    }
}

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
                savedJobs: action.payload.savedJobs
            }
        },
        removeActiveUser: (state: UserStateInterface) => {
            return state = initialState
            
        },
        // addToLikedJobs: (state: userInterface, action: PayloadAction<JobInterface>) => {
        //     return state = {
        //         ...state,
        //         savedJobs: {
        //             ...state.savedJobs,
        //             likedJobs: [
        //                 ...state.savedJobs.likedJobs,
        //                 action.payload
        //             ]
        //         }
        //     }
        // },
        // addToAppliedJobs: (state: userInterface, action: PayloadAction<JobInterface>) => {
        //     return state = {
        //         ...state,
        //         savedJobs: {
        //             ...state.savedJobs,
        //             appliedJobs: {
        //                 ...state.savedJobs.appliedJobs,
        //                 ...action.payload
        //             }
        //         }
        //     }
        // }
    }
})

export const { 
        setActiveUser, 
        removeActiveUser, 
        // addToAppliedJobs, 
        // addToLikedJobs
     } = userSlice.actions

export default userSlice