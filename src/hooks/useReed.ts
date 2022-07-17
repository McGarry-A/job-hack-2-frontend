import { useEffect, useState } from "react";
import axios from "axios"
import { JobInterface } from "./jobs.model";

interface props {
  page: number;
  title: string;
  location: string;
}

const useReed = ({title, location, page}: props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();
    const [jobs, setJobs] = useState<JobInterface[]>();

    useEffect(() => {
    setIsLoading(true)
    setError("")
    setJobs(undefined)
    }, [page, title, location])

    useEffect(() => {
      const fetchReed = async () => {
        try {
          const options = {
            method: "GET",
            url: `http://localhost:5001/api/reed`,
            params: { title, location, page },
            headers: {
              "Content-Type":"application/json",
            }
          }
      
          const response = await axios.request(options)

          setJobs(response.data.jobs)
          setError(false)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setJobs(undefined)
          setError(true)
          setIsLoading(false)
        }

      }
      fetchReed()
    }, [title, location, page])

    return { isLoading, error, jobs }
}

export default useReed;
