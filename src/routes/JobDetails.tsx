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

const JobDetails = () => {
  const params = useParams();
  const getProfile = useReedJob(params.id);

  const { error, loading, jobProfile } = getProfile;

  const [profile, setProfile] = useState(jobProfile);

  useEffect(() => {
    if (jobProfile) setProfile(jobProfile);
  }, [getProfile, jobProfile]);

  const renderHero = () => {
    if (!profile) {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
    }

    if (profile === undefined) {
      return <div>No results returned for this jobID</div>;
    }
    return (
      <div className="my-10 mx-auto text-center border-b w-3/5">
        <h2 className="text-3xl font-semibold tracking-tightest">
          {profile.jobTitle}
        </h2>
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
    if (!profile) {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
    }

    if (profile === undefined) {
      return <div>No results returned for this jobID</div>;
    }
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-2xl flex mb-24 flex-col space-y-4 py-8 px-14 shadow">
        <a
          href={profile.externalUrl}
          className="text-sky-400 cursor-pointer hover:underline w-max"
        >
          View company profile
        </a>
        <div>
          <h2 className="text-4xl tracking-tight">
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
          <a href={profile.jobUrl}>
            <button className="text-white px-6 py-3 bg-sky-400 rounded flex items-center justify-center border-2 border-sky-400">
              <TiBusinessCard className="mr-2 text-lg" />
              Add to List
            </button>
          </a>
          <a href={profile.jobUrl}>
            <button className="bg-white px-6 py-3 text-sky-400 rounded flex items-center justify-center border-sky-400 border-2">
              <AiOutlineEnter className="mr-2 text-lg" />
              Apply for role
            </button>
          </a>
        </div>
      </div>
    );
  };

  const renderMoreFromThisEmployer = () => {
    return <div></div>;
  };

  return (
    <div>
      <Navbar />
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
      >
        {renderBreadcrumbs()}
        {renderHero()}
        {renderJobDetails()}
        {renderMoreFromThisEmployer()}
      </motion.div>
      <Footer />
    </div>
  );
};

export default JobDetails;
