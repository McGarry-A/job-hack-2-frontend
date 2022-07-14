import { useEffect, useState } from "react";
import { idText } from "typescript";
import { ApiInterface, JobInterface } from "./apiInterfaces";

export type JobType = Pick<
  JobInterface,
  "title" | "location" | "description" | "salary_max" | "company" | "contract_type" | "redirect_url" | "id"
>;

interface props {
  page?: number;
  title?: string;
  location?: string;
  options: {
    name: string, state: boolean
  }[],
  sort: "date" | "relevance" | "salary"
}



const useAdzuna = ({ page, title, location, options, sort = "relevance" }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [fullJobs, setFullJobs] = useState<ApiInterface>();
  const [jobs, setJobs] = useState<JobType[]>();

  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError("")
    setJobs(undefined)
  }, [page, url])

  useEffect(() => {
    const setUrlParams = () => {  
      const newOptions: string[] = []
      
      options.forEach(el => {
        if (el.state === true) {
          newOptions.push("&" + el.name +"=1")
        }
      })

      const optionsString = newOptions.toString()
      const titleString = `&what=${title}`
      const locationString = `&where=${location}`
      const sortString = `&sort_by=${sort}`

      const baseUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=14758e80&app_key=b7bdf1e68baa9af01ec4a64dbfe8d2b3&results_per_page=10${optionsString}${titleString}${locationString}${sortString}`

      setUrl(baseUrl)
      console.log(url)
    }

    setUrlParams()
  }, [page, title, location, url, options]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (url === null) return 
        const response = await fetch(url);
        const data = await response.json();
        setFullJobs(data);
      } catch (error) {
        setError(error);
        setIsLoading(false)
      }
    };

    fetchData()
  }, [url, page])

  useEffect(() => {
    if (fullJobs) {
      const data: JobType[] = fullJobs.results.map((el) => {
        return {
          id: el.id,
          title: el.title,
          location: el.location,
          description: el.description,
          salary_max: el.salary_max,
          company: el.company,
          contract_type: el.contract_time,
          redirect_url: el.redirect_url
        };
      });
      
      setJobs(data);
      setIsLoading(false)
    }
  }, [fullJobs]);

  return { isLoading, error, jobs };
};

export default useAdzuna;
