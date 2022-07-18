import { useEffect, useState } from "react";
import axios from "axios";
import { JobInterface } from "./jobs.model";

const useReedEmployer = (employerId: number | undefined, page: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [jobs, setJobs] = useState<JobInterface[]>();

  useEffect(() => {
    setIsLoading(true);
    setError("");
    setJobs(undefined);
  }, [employerId, page]);

  useEffect(() => {
    const fetchReed = async () => {
      try {
        const options = {
          method: "GET",
          url: `https://jobhack2.herokuapp.com/api/reed/company/${employerId}`,
          params: { page },
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.request(options);
        
        if (response.data.jobs !== undefined) {
          setJobs(response.data.jobs);
          setError(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setJobs(undefined);
        setError(true);
        setIsLoading(false);
      }
    };
    fetchReed();
  }, [employerId, page]);

  return { isLoading, error, jobs };
};

export default useReedEmployer;
