import Hero from "../components/Layout/Hero/Hero";
import React, { useEffect, useRef, useState } from "react";
import PaginationWrapper from "../components/Paginate/PaginationWrapper/PaginationWrapper";
import useReed from "../hooks/useReed";
import Footer from "../components/Layout/Footer/Footer";
import HomeJobCard from "../components/HomeJobCards/HomeJobCard";
import { motion } from "framer-motion";
import { jobContainerVariant } from "../Animations/JobCard";
import { useAppDispatch } from "../store";
import { setNotification } from "../store/notificationSlice";
import { JobInterface } from "../hooks/jobs.model";
import JobSearchForm from "../components/Forms/JobSearchForm/JobSearchFrom";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const [job, setJob] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [pagination, setPagination] = useState<number>(1);

  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const providerRef = useRef<HTMLSelectElement>(null);

  const paginationOptions = { pagination, setPagination };

  const useJobsReed = useReed({
    page: pagination,
    title: job,
    location: location,
  });

  const dispatch = useAppDispatch();

  const { error, isLoading, jobs } = useJobsReed;

  useEffect(() => {
    if (error) {
      dispatch(
        setNotification({
          state: false,
          status: "error",
          message: "There was an error rendering cards.",
        })
      );
    }
  }, [error]);

  useEffect(() => {
    setPagination(1);
  }, [job, location]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleRef.current) setJob(titleRef.current?.value);
    if (locationRef.current) setLocation(locationRef.current?.value);

    return setPagination(1);
  };

  const renderCards = () => {
    if (error) {
      return (
        <div className="text-center my-10 text-lg">
          This search returned an error...
        </div>
      );
    }

    if (isLoading) return <Loader />;

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
  };

  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <BGWrapper>
        <ForegroundWrapper>
          <JobSearchForm
            handleFormSubmit={handleFormSubmit}
            titleRef={titleRef}
            locationRef={locationRef}
            providerRef={providerRef}
          />
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
