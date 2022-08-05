import { useParams } from "react-router-dom";
import Navbar from "../components/Layout/Navbar/Navbar";
import useReedJob from "../hooks/useReedJob";
import { useEffect, useState } from "react";
import HTMLParser from "../components/HTMLParser/HTMLParser";
import { AiOutlineEnter } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";
import Footer from "../components/Layout/Footer/Footer";
import { motion } from "framer-motion";
import RouteVar from "../Animations/Route";
import { useAppDispatch, useAppSelector } from "../store";
import { setNotification } from "../store/notificationSlice";
import { addToLikedJobs } from "../store/userSlice";
import HomeJobCard from "../components/HomeJobCards/HomeJobCard";
import { JobInterface } from "../hooks/jobs.model";
import { jobContainerVariant } from "../Animations/JobCard";
import useReedEmployer from "../hooks/useReedEmployer";
import Loader from "../components/Loader/Loader";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";

const JobDetails = () => {
  const params = useParams();
  const getProfile = useReedJob(params.id);

  const { error, loading, jobProfile } = getProfile;
  const [profile, setProfile] = useState(jobProfile);
  const [page, setPage] = useState<number>(1);

  const {
    isLoading,
    error: jobError,
    jobs,
  } = useReedEmployer(profile?.employerId, page);

  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jobProfile) setProfile(jobProfile);
  }, [getProfile, jobProfile]);

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Job Profile", link: "/contact" },
  ];

  const handleAddToList = () => {
    if (!profile) return;
    if (!state.isLoggedIn) {
      dispatch(
        setNotification({
          state: false,
          status: "error",
          message:
            "Please ensure that you are logged in before adding items to your wishlist.",
        })
      );

      return;
    }

    dispatch(
      setNotification({
        state: false,
        status: "success",
        message:
          "Successfully added to your list. You can now manage this in the My Jobs tab.",
      })
    );

    const jobToAdd = {
      title: profile.jobTitle,
      company: profile.employerName,
      salary: profile.maximumSalary as number,
      location: profile.locationName,
      description: profile.jobDescription,
    };

    dispatch(addToLikedJobs(jobToAdd));
  };

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
    if (loading) return <Loader />;

    if (error) {
      dispatch(
        setNotification({
          state: false,
          status: "error",
          message:
            "There was an error rending your cards, please reload the page.",
        })
      );
      return <div>There was an error rendering your cards</div>;
    }

    if (profile === undefined) {
      return <div>No results returned for this jobID</div>;
    }
    return (
      <>
        <a
          href={profile.externalUrl}
          className="text-sky-400 cursor-pointer hover:underline w-max"
        >
          View company profile
        </a>
        <div>
          <h2 className="text-4xl tracking-tight font-semibold text-gray-700">
            {profile.employerName} is hiring a {profile.jobTitle}
          </h2>
          <div className="border-b-4 w-12 border-sky-500 mt-4"></div>
        </div>
        <div className="text-right text-sm opacity-60 space-y-1">
          <p>Date posted: {profile.datePosted}</p>
          <p>Expires on: {profile.expirationDate}</p>
          <p>{profile.applicationCount} Applicants</p>
        </div>
        <HTMLParser html={profile.jobDescription} />
        <div className="flex space-x-4 pt-10">
          <button
            className="text-white px-6 py-3 bg-sky-400 rounded flex items-center justify-center border-2 border-sky-400"
            onClick={() => handleAddToList()}
          >
            <TiBusinessCard className="mr-2 text-lg" />
            Add to List
          </button>
          <a href={profile.jobUrl} target="_blank" rel="noopener noreferrer">
            <button className="bg-white px-6 py-3 text-sky-400 rounded flex items-center justify-center border-sky-400 border-2">
              <AiOutlineEnter className="mr-2 text-lg" />
              Apply for role
            </button>
          </a>
        </div>
      </>
    );
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
    if (jobError) {
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
          There are no results for this employer...
        </div>
      );
    }
    if (jobs && jobs.length > 1) {
      return (
        <motion.div
          className="space-y-4 pt-4 mt-4"
          variants={jobContainerVariant}
          initial="hidden"
          animate="show"
        >
          {jobs.map((el: JobInterface, index: number) => {
            return <HomeJobCard el={el} key={index} />;
          })}

          <button
            className="my-5 w-full border py-2 bg-sky-400 border-sky-400 text-gray-50 hover:bg-sky-300 hover:border-sky-300 rounded transition duration-150"
            onClick={() => setPage(page + 1)}
          >
            Load more jobs
          </button>
        </motion.div>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate={loading ? "" : `show`}
        exit={{ opacity: 0 }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {renderHero()}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl flex mb-24 flex-col space-y-4 py-8 px-14 shadow pb-10">
          {renderJobDetails()}
          {renderMoreFromThisEmployer()}
          {renderCards()}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default JobDetails;
