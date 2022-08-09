export interface UserStateInterface {
    isLoggedIn: boolean;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    savedJobs: savedJobsInterface
}

export interface savedJobsInterface {
    columnOrder: string[],
        jobs: {
            [key: string]: {
                id: string;
                title: string;
                company: string;
                link: string
            }
        },
        columns: {
            [key: string]: {
                id: string,
                title: string,
                jobIds: string[]
            }
        }
}