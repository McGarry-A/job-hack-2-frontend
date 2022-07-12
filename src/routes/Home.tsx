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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HomeJobCard from "../components/HomeJobCards/HomeJobCard";
import { motion } from "framer-motion";
import { jobContainerVariant } from "../Animations/JobCard";
import JobSkeleton from "../components/HomeJobCards/JobSkeleton";
// import GoogleAuth from "../components/GoogleAuth";

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
        <motion.div
          className="space-y-4 border-t pt-4"
          variants={jobContainerVariant}
          initial="hidden"
          animate="show"
        >
          {placeHolderArray.map((el, index) => {
            return <JobSkeleton />;
          })}
        </motion.div>
      );
    }

    return (
      <motion.div
        className="space-y-4 border-t pt-4"
        variants={jobContainerVariant}
        initial="hidden"
        animate="show"
      >
        {jobs!.map((el: JobType, index: number) => {
          return <HomeJobCard el={el} key={index} />;
        })}
      </motion.div>
    );
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
