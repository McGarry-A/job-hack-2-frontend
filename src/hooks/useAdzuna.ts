import { useEffect, useState } from "react";
import { ApiInterface, JobInterface } from "./apiInterfaces";

type JobType = Pick<
  JobInterface,
  "title" | "location" | "description" | "salary_max" | "company" | "contract_type"
>;

const useAdzuna = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [fullJobs, setFullJobs] = useState<ApiInterface>();
  const [jobs, setJobs] = useState<JobType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=14758e80&app_key=b7bdf1e68baa9af01ec4a64dbfe8d2b3&results_per_page=10"
        );
        const data = await response.json();
        setFullJobs(data);
      } catch (error) {
        setError(error);
        setIsLoading(false)
      }
    };
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
