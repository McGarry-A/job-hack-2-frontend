import { JobInterface } from "../../hooks/jobs.model";
import Loader from "../Loader/Loader";
import HomeJobCard from "./HomeJobCard";
import { motion } from "framer-motion";
import { jobContainerVariant } from "../../animations/JobCard";

interface props {
  jobs: JobInterface[] | undefined;
  error: any;
  isLoading: boolean;
}

const HomeJobCardContainer = ({ jobs, error, isLoading }: props) => {
  if (error) {
    return (
      <div className="text-center my-10 text-lg">
        This search returned an error...
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex flex-col justify-center flex-grow ">
        <Loader />
      </div>
    );

  if (jobs && jobs.length === 0) {
    return (
      <div className="my-10 mx-auto text-lg text-center">
        There are no results for your search...
      </div>
    );
  }
  if (jobs && jobs.length > 1) {
    return (
      <motion.div
        className="space-y-4 border-t pt-4 mt-4"
        variants={jobContainerVariant}
        initial="hidden"
        animate="show"
      >
        {jobs.map((el: JobInterface, index: number) => {
          return <HomeJobCard el={el} key={index} />;
        })}
      </motion.div>
    );
  }

  return <></>;
};

export default HomeJobCardContainer;
