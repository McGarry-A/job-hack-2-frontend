
// FOR FRONTEND 
export interface JobInterface {
  title: string;
  location: string;
  description: string;
  salary: number;
  company: string;
  contract: string;
  url: string;
  id: number;
}

// FOR REED
export interface ReedResponseInterface {
    results: [];
    ambiguousLocations: [];
    totalResults: number;
}

export interface ReedJobInterface {
    jobId: number;
    employerId: number;
    employerName: string;
    employerProfileId: number | null,
    employerProfileName: string | null,
    jobTitle: string,
    locationName: string,
    minimumSalary: number,
    maximumSalary: number,
    currency: string,
    expirationDate: string,
    date: string,
    jobDescription: string,
    applications: number,
    jobUrl: string
}

// REED JOB PROFILE

export interface ReedJobProfileInterface {
  message: string;
  profile: ReedJobProfile
}

export interface ReedJobProfile {
  employerId: number;
  employerName: string;
  jobId: number;
  jobTitle: string;
  locationName: string;
  minimumSalary: number | null;
  maximumSalary: number | null;
  yearlyMinimumSalary: number | null;
  yearlyMaximumSalary: number | null;
  currency: string | null;
  salaryType: string;
  salary: number | null
  datePosted: string;
  expirationDate: string;
  externalUrl: string;
  jobUrl: string;
  partTime: boolean;
  fullTime: boolean;
  contractType: string;
  jobDescription: string;
  applicationCount: number;
}