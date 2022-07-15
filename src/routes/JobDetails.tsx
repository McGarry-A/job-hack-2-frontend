import { useParams, NavLink } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import Navbar from "../components/Navbar/Navbar";
import useReedJob from "../hooks/useReedJob";
import { useEffect, useState } from "react";
import HTMLParser from "../components/HTMLParser/HTMLParser";
import { AiOutlineEnter } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";

const JobDetails = () => {
  const params = useParams();
  const getProfile = useReedJob(params.id);

  const { error, loading, jobProfile } = getProfile;

  const [profile, setProfile] = useState(jobProfile);

  useEffect(() => {
    if (jobProfile) setProfile(jobProfile);
  }, [getProfile, jobProfile]);

  if (!profile) {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
  }

  if (profile === undefined) {
    return <div>No results returned for this jobID</div>;
  }

  const renderHero = (title: string, company: string) => {
    return (
      <div className="my-10 mx-auto text-center border-b w-3/5">
        <h2 className="text-3xl font-semibold tracking-tightest">{title}</h2>
        <h5 className="text-lg text-gray-600">
          <span className="opacity-50">At</span> {company}
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
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-2xl flex mb-24 flex-col space-y-4 py-8 px-14 shadow">
        <div>
          <h2 className="text-4xl tracking-tight">
            {profile.employerName} is hiring a {profile.jobTitle}
          </h2>
          <div className="border-b-4 w-12 border-sky-500 mt-4"></div>
        </div>
        <HTMLParser html={profile.jobDescription} />
        <a href={profile.jobUrl}>
          <button className="text-white px-6 py-3 bg-sky-400 rounded flex items-center justify-center">
            <TiBusinessCard  className="mr-2 text-lg"/>
            See Company Website
          </button>
        </a>
        <a href={profile.jobUrl}>
          <button className="text-white px-6 py-3 bg-sky-400 rounded flex items-center justify-center">
            <AiOutlineEnter  className="mr-2 text-lg"/>
            Apply for role
          </button>
        </a>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {renderBreadcrumbs()}
      {renderHero(profile.jobTitle, profile.employerName)}
      {renderJobDetails()}
    </div>
  );
};

export default JobDetails;
