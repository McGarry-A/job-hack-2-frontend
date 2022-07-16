import axios from "axios"
import { useEffect, useState } from "react"
import { ReedJobProfile } from "./jobs.model"

const useReedJob = (jobId: string = "") => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [jobProfile, setJobProfile] = useState<ReedJobProfile>()

    console.log(jobId)

    useEffect(() => {
        const fetchReed = async () => {
            try {
              const options = {
                method: "GET",
                url: `${process.env.SERVER_API}api/reed/${jobId}`,
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
              console.log(error)
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