import { useEffect, useState } from "react";
import axios from "axios";
import { JobInterface } from "../types/ReedJobsTypes";

interface props {
  page: number;
  title: string;
  location: string;
  sort?: string | null;
}

const useReed = ({ title, location, page = 1, sort = "" }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [jobs, setJobs] = useState<JobInterface[]>();

  useEffect(() => {
    setIsLoading(true);
    setError("");
    setJobs(undefined);
  }, [page, title, location, sort]);

  useEffect(() => {
    const fetchReed = async () => {
      try {
        const options = {
          method: "GET",
          url: `${process.env.SERVER_API}/api/reed`,
          params: { title, location, page, sort },
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.request(options);
        const pageStart = page * 10;
        const pageEnd = pageStart + 10;

        setJobs(response.data.jobs.slice(pageStart, pageEnd));
        setError(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setJobs(undefined);
        setError(true);
        setIsLoading(false);
      }
    };
    fetchReed();
  }, [title, location, page, sort]);

  return { isLoading, error, jobs };
};

export default useReed;
