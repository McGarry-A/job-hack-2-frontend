import { useEffect, useState } from "react";
import { ReedJobInterface, ReedResponseInterface } from "./reedInterfaces";

export type JobType = Pick<
  ReedJobInterface,
  "jobTitle" | "locationName" | "jobDescription" | "maximumSalary" | "employerName"
>;

interface props {
  page?: number;
  title?: string;
  location?: string;
  options: {
    name: string, state: boolean
  }[]
}

const useReed = ({ title, location, options}: props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();
    const [fullJobs, setFullJobs] = useState<ReedResponseInterface>();
    const [jobs, setJobs] = useState<JobType[]>();

    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const setUrlParams = () => {  
          // There is a different way to paginate using this
          // results to take
          // results to skip
    
          const baseUrl = `https://www.reed.co.uk/api/{versionnumber}/search?keywords=${title}&locationName=${location}`
    
          setUrl(baseUrl)
        }
    
        setUrlParams()
      }, [title, location, url]);

      useEffect(() => {
        const API_KEY = 'YjYwZGRmM2VkYzRjNDBmNWE4NjZiNmUzZDkxY2UyY2Q6'

        const fetchData = async () => {
          try {
            if (url === null) return 
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`Basic ${API_KEY}`
                }
            });
            const data: ReedResponseInterface = await response.json();
            setFullJobs(data);
          } catch (error) {
            setError(error);
            setIsLoading(false)
          }
        };
    
        fetchData()
      }, [url])

      useEffect(() => {
        if (fullJobs) {
          const data: JobType[] = fullJobs.results.map((el) => {
            return {
              jobTitle: el.jobTitle,
              locationName: el.locationName,
              jobDescription: el.jobDescription,
              maximumSalary: el.maximumSalary,
              employerName: el.employerName,
            };
          });
          
          setJobs(data);
          setIsLoading(false)
        }
      }, [fullJobs]);

    return { isLoading, error, jobs }
}

export default useReed;
