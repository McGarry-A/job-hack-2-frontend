import { useEffect, useState } from "react";
import axios from "axios"
import { JobInterface } from "./jobs.model";

const useReedEmployer = (employerId: number | undefined) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();
    const [jobs, setJobs] = useState<JobInterface[]>();

    useEffect(() => {
    setIsLoading(true)
    setError("")
    setJobs(undefined)
    }, [employerId])

    useEffect(() => {
      const fetchReed = async () => {
        try {
          const options = {
            method: "GET",
            url: `http://localhost:5001/api/reed/company/${employerId}`,
            headers: {
              "Content-Type":"application/json",
            }
          }
      
          const response = await axios.request(options)

          console.log(response)
          console.log(jobs)

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
    }, [employerId])

    return { isLoading, error, jobs }
}

export default useReedEmployer;
