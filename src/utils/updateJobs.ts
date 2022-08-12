import axios from "axios";
import { savedJobsInterface } from "../types/UserTypes";

interface props {
  newJobsState: savedJobsInterface;
  email: number;
}

const updateJobs = async ({newJobsState, email}: props) => {
  try {
    const options = {
        url: "http://localhost:5001/api/jobs",
        method: "POST",
        Headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            newJobs: newJobsState,
            email
        })        
    }

    const response = await axios.request(options)
    return response
  } catch (error) {
    console.error(error);
  }
};

export default updateJobs;