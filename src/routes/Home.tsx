import Hero from "../components/Hero/Hero";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox/Checkbox";
import PaginationWrapper from "../components/PaginationWrapper/PaginationWrapper";
import HomeJobCards from "../components/HomeJobCards/HomeJobCards";
import useAdzuna, { JobType } from "../hooks/useAdzuna";
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

  const useJobs = useAdzuna({
    page: pagination,
    title: job,
    location: location,
    fullTime: fullTime,
    freelance: freelance,
    partTime: partTime,
    graduate: graduate,
    internship: internship,
  });

  const { error, isLoading, jobs } = useJobs;

  useEffect(() => {
    setJobsState({ error, isLoading, jobs });
  }, [pagination, error, jobs, isLoading]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJobsState({ error, isLoading, jobs });
  };

  const renderOptions = () => {
    const options = [
      { name: "Freelance", state: freelance, setState: setFreelance },
      { name: "Full-Time", state: fullTime, setState: setFullTime },
      { name: "Part-Time", state: partTime, setState: setPartTime },
      { name: "Graduate", state: graduate, setState: setGraduate },
      { name: "Internship", state: internship, setState: setInternship },
    ];

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
    if (jobsState && jobsState.jobs) {
      return (
        <HomeJobCards
          jobs={jobsState.jobs}
          isLoading={jobsState.isLoading}
          error={jobsState.error}
        />
      );
    }

    return <div>Loading...</div>;
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
    </div>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative h-screen">{children}</div>;
};

const ForegroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-4/5 mx-auto bg-white p-4 shadow-lg rounded absolute -top-10 left-0 right-0">
      {children}
    </div>
  );
};

export default Home;
