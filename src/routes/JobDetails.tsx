import { useParams, NavLink } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import Navbar from "../components/Navbar/Navbar";
import useReedJob from "../hooks/useReedJob";
import { useEffect, useState } from "react";
import HTMLParser from "../components/HTMLParser/HTMLParser";
import { AiOutlineEnter } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";
import Footer from "../components/Footer/Footer";
import { motion } from "framer-motion";
import RouteVar from "../Animations/Route";
import { useAppDispatch, useAppSelector } from "../store";
import { setNotification } from "../store/notificationSlice";
import { addToLikedJobs } from "../store/userSlice";
import HomeJobCard from "../components/HomeJobCards/HomeJobCard";
import { JobInterface } from "../hooks/jobs.model";
import { jobContainerVariant } from "../Animations/JobCard";
import useReedEmployer from "../hooks/useReedEmployer";

const JobDetails = () => {
  const params = useParams();
  const getProfile = useReedJob(params.id);

  const { error, loading, jobProfile } = getProfile;
  const [profile, setProfile] = useState(jobProfile);

  const { isLoading, error: jobError, jobs } = useReedEmployer(profile?.employerId);

  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jobProfile) setProfile(jobProfile);
  }, [getProfile, jobProfile]);

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
      if (loading) return <></>;
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

  const renderBreadcrumbs = () => {
    return (
      <div className="flex space-x-2 items-center justify-center my-12">
        <NavLink
          to="/"
          className="opacity-50 text-xs uppercase tracking-widest mt-1"
        >
          Home
        </NavLink>
        <GrFormNext size={"1.3rem"} className="opacity-50" />
        <NavLink
          to="/contact"
          className="text-xs uppercase tracking-widest mt-1"
        >
          Job Profile
        </NavLink>
      </div>
    );
  };

  const renderJobDetails = () => {
    if (loading) {
      return (
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

    if (isLoading) {
      return (
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

          <button className="my-5 w-full border py-2 bg-sky-400 border-sky-400 text-gray-50 hover:bg-sky-300 hover:border-sky-300 rounded">
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
        {renderBreadcrumbs()}
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
