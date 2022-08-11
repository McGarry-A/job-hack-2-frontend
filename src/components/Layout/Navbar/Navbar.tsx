import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const location = useLocation();

  const [isHome] = useState<boolean>(location.pathname === "/" ? true : false);

  const renderWelcomeName = () => {
    const {
      isLoggedIn,
      user: { firstName },
    } = user;
    if (isLoggedIn) {
      return (
        <div>
          <p>
            Welcome back,{" "}
            <span className="font-semibold text-sky-300 tracking-wider">
              {firstName}
            </span>
          </p>
        </div>
      );
    }
    return <div></div>;
  };

  const renderJobsCount = () => {
    const jobsCount = Object.keys(jobs).length;

    if (jobsCount > 0) {
      return (
        <span className="absolute -top-3 -right-2 bg-rose-600 px-1 w-5 h-5 text-sm font-semibold rounded-[50%] flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full w-full h-4 bg-rose-500">
            <p className="ml-[2px]">{jobsCount}</p>
          </span>
        </span>
      );
    }
  };

  const renderIsLoggedInTabs = () => {
    const { isLoggedIn } = user;

    if (isLoggedIn === true) {
      return (
        <>
          <li>
            <NavLink to="/my-account">
              <button
                className={`border-2 px-4 py-1 rounded ${
                  isHome
                    ? "text-gray-50 border-gray-50 hover:text-gray-200 hover:border-gray-200"
                    : "text-sky-600 border-sky-600 hover:text-sky-500 hover:border-sky-500"
                }`}
              >
                My Account
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-jobs">
              <button className="border-2 px-4 py-1 hover:bg-sky-400 hover:border-sky-400 bg-sky-500 border-sky-500 rounded text-gray-50 relative">
                My Jobs
                {renderJobsCount()}
              </button>
            </NavLink>
          </li>
        </>
      );
    }
  };

  const renderNotLoggedInTabs = () => {
    const { isLoggedIn } = user;

    if (isLoggedIn === false) {
      return (
        <>
          <li>
            <NavLink to="/register">
              <button className="border-2 px-4 py-1 bg-sky-500 border-sky-500 rounded text-gray-50">
                My Account
              </button>
            </NavLink>
          </li>
        </>
      );
    }
  };

  const renderNavLinks = () => (
    <>
      <li
        className={`cursor-pointer ${
          isHome ? "text-gray-50" : "text-gray-500"
        } tracking-wider`}
      >
        <NavLink to="/">Home</NavLink>
      </li>
      <li
        className={`cursor-pointer ${
          isHome ? "text-gray-50" : "text-gray-500"
        } tracking-wider`}
      >
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <header className="flex justify-between p-8 bg-transparent items-center">
      {renderWelcomeName()}
      <nav className="flex justify-end">
        <ul className="flex space-x-8 items-center">
          {renderNavLinks()}
          {renderNotLoggedInTabs()}
          {renderIsLoggedInTabs()}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
