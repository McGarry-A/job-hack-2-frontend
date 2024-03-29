import axios from "axios"
import { useEffect, useState } from "react"
import { ReedJobProfile } from "../types/ReedJobsTypes"

const useReedJob = (jobId: string = "") => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [jobProfile, setJobProfile] = useState<ReedJobProfile>()

    useEffect(() => {
        const fetchReed = async () => {
            try {
              const options = {
                method: "GET",
                url: `https://jobhack2.herokuapp.com/api/reed/${jobId}`,
                headers: {
                  "Content-Type":"application/json",
                }
              }
          
              const response = await axios.request(options)
              const data = await response.data
    
              setJobProfile(data.profile)
              setError(false)
              setLoading(false)
            } catch (error) {
              setJobProfile(undefined)
              setError(true)
              setLoading(false)
            }
    
          }
          fetchReed()
    }, [jobId])

    return {error, loading, jobProfile}
}

export default useReedJob