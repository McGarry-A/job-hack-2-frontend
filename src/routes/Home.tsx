import Hero from "../components/Hero/Hero";
import React, { useEffect, useRef, useState } from "react";
import PaginationWrapper from "../components/Paginate/PaginationWrapper/PaginationWrapper";
import useReed from "../hooks/useReed";
import Footer from "../components/Layout/Footer/Footer";
import { useAppDispatch } from "../store";
import { setNotification } from "../store/notificationSlice";
import JobSearchForm from "../components/Forms/JobSearchForm/JobSearchFrom";
import HomeJobCardContainer from "../components/HomeJobCards/HomeJobCardContainer";

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

  const { error } = useJobsReed;

  useEffect(() => {
    //@ts-ignore
    google.accounts.id.prompt()
  }, [])

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
            <HomeJobCardContainer {...useJobsReed} />
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
    <div className="w-4/5 mx-auto border-2 bg-white p-4 shadow-lg rounded -mt-14 mb-14 h-[1105px] flex flex-col justify-between relative">
      {children}
    </div>
  );
};

export default Home;
