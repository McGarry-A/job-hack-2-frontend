export interface ReedResponseInterface {
    results: Array<ReedJobInterface>
    ambiguousLocations: Array<any>;
    totalResults: number
}

export interface ReedJobInterface {
    jobId: number;
    employerId: number;
    employerName: string;
    employerProfileId: string | null;
    employerProfileName: string | null;
    jobTitle: string;
    locationName: string;
    minimumSalary: number,
    maximumSalary: number,
    currency: string;
    expirationDate: string;
    date: string;
    jobDescription: string;
    applications: number;
    jobUrl: string;
}