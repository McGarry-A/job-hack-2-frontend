import Hero from "../components/Hero/Hero";
import React, { useEffect, useRef, useState } from "react";
import PaginationWrapper from "../components/Paginate/PaginationWrapper/PaginationWrapper";
import useReed from "../hooks/useReed";
import Footer from "../components/Layout/Footer/Footer";
import JobSearchForm from "../components/Forms/JobSearchForm/JobSearchFrom";
import HomeJobCardContainer from "../components/HomeJobCards/HomeJobCardContainer";
import { useToast } from "@chakra-ui/react";
import ContentWrapper from "../components/Layout/ContentWrapper/ContentWrapper";

const Home = () => {
  const [job, setJob] = useState<string>("React");
  const [location, setLocation] = useState<string>("Manchester");
  const [pagination, setPagination] = useState<number>(1);
  const [sort, setSort] = useState<string | null>("");

  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const paginationOptions = { pagination, setPagination };

  const useJobsReed = useReed({
    page: pagination,
    title: job,
    location,
    sort,
  });

  const toast = useToast();

  const { error } = useJobsReed;

  // useEffect(() => {
  //   //@ts-ignore
  //   google.accounts.id.prompt()
  // }, [])

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error",
        description: "There was an error rendering cards",
        duration: 5000,
        isClosable: true,
      });
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
      <ContentWrapper>
        <BGWrapper>
          <ForegroundWrapper>
            <JobSearchForm
              handleFormSubmit={handleFormSubmit}
              titleRef={titleRef}
              locationRef={locationRef}
              setSort={setSort}
            />
            <PaginationWrapper {...paginationOptions}>
              <HomeJobCardContainer {...useJobsReed} />
            </PaginationWrapper>
          </ForegroundWrapper>
        </BGWrapper>
        <Footer />
      </ContentWrapper>
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
    <div className="w-4/5 mx-auto border-2 bg-white p-4 shadow-lg rounded -mt-14 mb-14 min-h-[1115px] flex flex-col justify-between relative">
      {children}
    </div>
  );
};

export default Home;
