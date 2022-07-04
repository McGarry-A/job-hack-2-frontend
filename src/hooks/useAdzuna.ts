import { useEffect, useState } from "react";
import { ApiInterface, JobInterface } from "./apiInterfaces";

type JobType = Pick<
  JobInterface,
  "title" | "location" | "description" | "salary_max" | "company" | "contract_type"
>;

interface props {
  page: number;
  title: string;
  location: string;
  fullTime: boolean;
  partTime: boolean;
  graduate: boolean;
  internship: boolean;
}

const useAdzuna = ({page = 1, title, location, fullTime, partTime}: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [fullJobs, setFullJobs] = useState<ApiInterface>();
  const [jobs, setJobs] = useState<JobType[]>();

  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    const setUrlParams = () => {
      let baseUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=14758e80&app_key=b7bdf1e68baa9af01ec4a64dbfe8d2b3&results_per_page=10`

      const titleString = `&what=${title}`
      const locationString = `&where=${location}`
      const fullTimeString = `&full_time=${fullTime === true ? "1" : "0"}`
      const partTimeString = `&part_time=${partTime === true ? "1" : "0"}`
      
      const options = [titleString, locationString, fullTimeString, partTimeString]

      options.forEach((el) => baseUrl.concat(el))
      setUrl(baseUrl)
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          url
        );
        const data = await response.json();
        setFullJobs(data);
      } catch (error) {
        setError(error);
        setIsLoading(false)
      }
    };
    setUrlParams()
    fetchData();

  }, []);

  useEffect(() => {
    if (isLoading && fullJobs) {
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
  }, [fullJobs, isLoading]);

  return { isLoading, error, jobs };
};

export default useAdzuna;
