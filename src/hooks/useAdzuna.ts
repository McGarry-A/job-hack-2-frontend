import { useEffect, useState } from "react";
import { ApiInterface, JobInterface } from "./apiInterfaces";

export type JobType = Pick<
  JobInterface,
  "title" | "location" | "description" | "salary_max" | "company" | "contract_type"
>;

interface props {
  page?: number;
  title?: string;
  location?: string;
  fullTime?: boolean;
  partTime?: boolean;
  graduate?: boolean;
  internship?: boolean;
  freelance?: boolean;
}

const useAdzuna = ({page, title, location, fullTime, partTime, freelance, graduate, internship}: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [fullJobs, setFullJobs] = useState<ApiInterface>();
  const [jobs, setJobs] = useState<JobType[]>();

  const [url, setUrl] = useState<string | null>(null)

  // const allOptions = [fullTime, partTime, freelance, graduate, internship]
  // const filteredOptions = allOptions.filter((el) => el === false)

  useEffect(() => {
    const setUrlParams = () => {  
      const titleString = `&what=${title}`
      const locationString = `&where=${location}`
      // const options = filteredOptions.map(el => {
      //   return `%20${el}`
      // }).toString()

      const baseUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=14758e80&app_key=b7bdf1e68baa9af01ec4a64dbfe8d2b3&results_per_page=10${titleString}${locationString}`

      setUrl(baseUrl)
    }

    setUrlParams()
  }, [page, title, location, url]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (url === null) return 
        const response = await fetch(url);
        const data = await response.json();
        setFullJobs(data);
      } catch (error) {
        setError(error);
        setIsLoading(false)
      }
    };

    fetchData()
  }, [url, page])

  useEffect(() => {
    if (fullJobs) {
      const data: JobType[] = fullJobs.results.map((el) => {
        return {
          title: el.title,
          location: el.location,
          description: el.description,
          salary_max: el.salary_max,
          company: el.company,
          contract_type: el.contract_time
        };
      });
      
      setJobs(data);
      setIsLoading(false)
    }
  }, [fullJobs]);

  return { isLoading, error, jobs };
};

export default useAdzuna;
