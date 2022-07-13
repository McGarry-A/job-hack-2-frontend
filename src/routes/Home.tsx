import Hero from "../components/Hero/Hero";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox/Checkbox";
import PaginationWrapper from "../components/PaginationWrapper/PaginationWrapper";
import useAdzuna, { JobType } from "../hooks/useAdzuna";
import useReed from "../hooks/useReed";
import Footer from "../components/Footer/Footer";
import "react-loading-skeleton/dist/skeleton.css";
import HomeJobCard from "../components/HomeJobCards/HomeJobCard";
import { motion } from "framer-motion";
import { jobContainerVariant } from "../Animations/JobCard";
import JobSkeleton from "../components/HomeJobCards/JobSkeleton";
import Modal from "../components/Modal/Modal";

type JobsState = {
  error: unknown;
  isLoading: boolean;
  jobs: JobType[] | undefined;
};

const Home = () => {
  const [jobsState, setJobsState] = useState<JobsState>();

  const [job, setJob] = useState<string>("developer");
  const [location, setLocation] = useState<string>("manchester");

  const [freelance, setFreelance] = useState<boolean>(false);
  const [fullTime, setFullTime] = useState<boolean>(false);
  const [partTime, setPartTime] = useState<boolean>(false);
  const [graduate, setGraduate] = useState<boolean>(false);
  const [internship, setInternship] = useState<boolean>(false);

  const [pagination, setPagination] = useState<number>(1);

  const [errorIsHidden, setErrorIsHidden] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const paginationOptions = { pagination, setPagination };

  const options = [
    { name: "Freelance", state: freelance, setState: setFreelance },
    { name: "Full-Time", state: fullTime, setState: setFullTime },
    { name: "Part-Time", state: partTime, setState: setPartTime },
    { name: "Graduate", state: graduate, setState: setGraduate },
    { name: "Internship", state: internship, setState: setInternship },
  ];

  const optionsForAdzuna = options.map((el) => {
    return { name: el.name, state: el.state };
  });

  const useJobs = useAdzuna({
    page: pagination,
    title: job,
    location: location,
    options: optionsForAdzuna,
  });

  const useJobsReed = useReed({
    page: pagination,
    title: job,
    location: location,
    options: optionsForAdzuna,
  });

  console.log(useJobsReed);

  const { error, isLoading, jobs } = useJobs;

  useEffect(() => {
    setJobsState({ error, isLoading, jobs });
  }, [pagination, error, jobs, isLoading]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJobsState({ error, isLoading, jobs });
  };

  const renderOptions = () => {
    return (
      <div className="space-x-4 flex my-3 items-center">
        {options.map((el, index) => {
          return (
            <Checkbox
              name={el.name}
              key={index}
              isChecked={el.state}
              setIsChecked={el.setState}
            />
          );
        })}
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form
        className="grid grid-cols-4 gap-3"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex border py-2 items-center px-2 text-sm lg:text-lg">
          <AiOutlineSearch className="mr-2 text-2xl" />
          <input
            placeholder="Job Type"
            className="w-full focus:outline-none"
            onChange={(e) => setJob(e.target.value)}
          />
        </div>
        <div className="flex border py-2 items-center px-2 text-sm lg:text-lg">
          <GoLocation className="mr-2 text-2xl" />
          <input
            placeholder="Location"
            className="w-full focus:outline-none"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex border py-2 items-center px-2 text-sm lg:text-lg">
          <HiOutlineOfficeBuilding className="mr-2 text-2xl" />
          <select
            placeholder="input"
            className="w-full focus:outline-none"
            onChange={() => undefined}
          >
            <option value={"office"}>Office</option>
            <option value={"remote"}>Remote</option>
            <option value={"hybrid"}>Hybrid</option>
          </select>
        </div>
        <button className="border bg-sky-500 text-gray-50" type="submit">
          Search Jobs
        </button>
      </form>
    );
  };

  const renderCards = () => {
    if (error) return <p>There was an error rendering the cards</p>;

    const placeHolderArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (isLoading) {
      return (
        // <motion.div
        //   className="space-y-4 border-t pt-4"
        //   variants={jobContainerVariant}
        //   initial="hidden"
        //   animate="show"
        // >
        //   {placeHolderArray.map((el, index) => {
        //     return <JobSkeleton key={index} />;
        //   })}
        // </motion.div>
        <button
          type="button"
          className=" px-4 py-2 rounded flex items-center justify-center mx-auto my-10"
          disabled
        >
          <svg
            role="status"
            className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-50 fill-sky-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          Processing...
        </button>
      );
    }

    if (jobs) {
      return (
        <motion.div
          className="space-y-4 border-t pt-4"
          variants={jobContainerVariant}
          initial="hidden"
          animate="show"
        >
          {jobs.map((el: JobType, index: number) => {
            return <HomeJobCard el={el} key={index} />;
          })}
        </motion.div>
      );
    }
  };

  return (
    <div>
      <Hero />
      <BGWrapper>
        <ForegroundWrapper>
          {renderForm()}
          {renderOptions()}
          <PaginationWrapper {...paginationOptions}>
            {renderCards()}
          </PaginationWrapper>
        </ForegroundWrapper>
      </BGWrapper>
      <Footer />
    </div>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const ForegroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-4/5 mx-auto bg-white p-4 shadow-lg rounded -mt-14 mb-14">
      {children}
    </div>
  );
};

export default Home;
