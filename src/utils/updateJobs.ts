import axios from "axios";
import { savedJobsInterface } from "../types/UserTypes";

interface props {
  newJobsState: savedJobsInterface;
  email: string;
}

const updateJobs = async ({ newJobsState, email }: props) => {
  try {
    const options = {
        url: "http://localhost:5001/api/jobs",
        method: "POST",
        Headers: {
            "Content-Type":"application/json"
        },
        data: {
            newJobs: newJobsState,
            email
        }        
    }

    const response = await axios.request(options)
    if (response.status === 200) return true
    else return false

  } catch (error) {
    return false
  }
};

export default updateJobs;