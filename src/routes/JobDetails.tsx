import { useParams } from "react-router-dom";
import Navbar from "../components/Layout/Navbar/Navbar";
import useReedJob from "../hooks/useReedJob";
import { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer/Footer";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import useReedEmployer from "../hooks/useReedEmployer";
import Loader from "../components/Loader/Loader";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import HomeJobCardContainer from "../components/HomeJobCards/HomeJobCardContainer";
import JobProfile from "../components/JobProfile/JobProfile";
import ContentWrapper from "../components/Layout/ContentWrapper/ContentWrapper";

const JobDetails = () => {
  const params = useParams();
  const getProfile = useReedJob(params.id);

  const { error, loading, jobProfile } = getProfile;
  const [profile, setProfile] = useState(jobProfile);
  const [page, setPage] = useState<number>(1);

  const useReedEmployerJobs = useReedEmployer(profile?.employerId, page);
  const { jobs } = useReedEmployerJobs;

  useEffect(() => {
    if (jobProfile) setProfile(jobProfile);
  }, [getProfile, jobProfile]);

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Job Profile", link: "/contact" },
  ];

  const renderHero = () => {
    if (!profile) {
      if (loading) return <Loader />;
      if (error) return <div>Error</div>;
    }

    if (profile === undefined) {
      return <div>No results returned for this jobID</div>;
    }
    return (
      <div className="my-10 mx-auto text-center border-b w-3/5">
        <h3 className="text-3xl font-semibold tracking-tightest text-gray-700">
          {profile.jobTitle}
        </h3>
        <h5 className="text-lg text-gray-600">
          <span className="opacity-50">At</span> {profile.employerName}
        </h5>
        <div className="mt-5 border-b-8 border-sky-500 w-24 mx-auto"></div>
      </div>
    );
  };

  const renderJobDetails = () => {
    return <JobProfile profile={profile} isLoading={loading} error={error} />;
  };

  const renderMoreFromThisEmployer = () => {
    return (
      <div className="pt-5">
        <div className="mt-5 border-t pt-10">
          <h3 className="text-3xl tracking-tight font-semibold text-gray-700">
            More from this Employer
          </h3>
        </div>
      </div>
    );
  };

  const renderCards = () => {
    return (
      <>
        <HomeJobCardContainer {...useReedEmployerJobs} />
      </>
    );
  };

  const renderLoadMoreButton = () => {
    console.log(jobs)
    if (jobs && jobs.length === (page * 5)) {
      return (
        <>
          <button
            className="my-5 w-full border py-2 bg-sky-400 border-sky-400 text-gray-50 hover:bg-sky-300 hover:border-sky-300 rounded transition duration-150"
            onClick={() => setPage(page + 1)}
          >
            Load more jobs
          </button>
        </>
      );
    }

    if (jobs && jobs.length < (page * 5)) {
      return (
        <>
          <button
            className="my-5 w-full border py-2 text-sky-400 border-sky-400 bg-gray-50 hover:border-sky-300 rounded transition duration-150"
            disabled
          >
            No more Jobs
          </button>
        </>
      )

    }
  };

  return (
    <ContentWrapper>
      <Navbar />
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate={loading ? "" : "show"}
        exit={{ opacity: 0 }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {renderHero()}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl flex mb-24 flex-col space-y-4 py-8 px-14 shadow pb-10">
          {renderJobDetails()}
          {renderMoreFromThisEmployer()}
          {renderCards()}
          {renderLoadMoreButton()}
        </div>
      </motion.div>
      <Footer />
    </ContentWrapper>
  );
};

export default JobDetails;
