import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { GiHamburgerMenu } from "react-icons/gi";
import { removeActiveUser } from "../../../store/userSlice";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const location = useLocation();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const [isHome] = useState<boolean>(location.pathname === "/" ? true : false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleSignOut = () => {
    dispatch(removeActiveUser());
    return toast({
      status: "success",
      title: "Successfully logged out",
      duration: 5000,
    });
  };

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

  const renderHamburger = () => {
    return (
      <div
        className={`cursor-pointer z-50 md:hidden ${
          isMenuActive || isHome ? `text-gray-50` : `text-gray-900`
        }`}
        onClick={() => setIsMenuActive(!isMenuActive)}
      >
        <GiHamburgerMenu size={"2rem"} />
      </div>
    );
  };

  const renderMobileMenu = () => {
    const { isLoggedIn } = user;
    return (
      <div
        className={`${
          isMenuActive
            ? "w-full z-40 bg-sky-900 bg-opacity-90 block overflow-y-hidden scroll"
            : "hidden w-0"
        } transition duration-300 fixed h-full max-h-screen left-0 top-0 text-gray-50 md:hidden`}
      >
        <ul className="flex flex-col w-full items-center justify-center h-3/4 text-4xl space-y-10 font-semibold transition duration-300">
          <li className="cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li className="cursor-pointer">
                <NavLink to="/my-account">My Account</NavLink>
              </li>
              <li className="cursor-pointer ">
                <div className="relative">
                  <NavLink to="/my-jobs">My Jobs</NavLink>
                  {renderJobsCount()}
                </div>
              </li>
            </>
          )}
          <li className="mt-2">
            {isLoggedIn ? (
              <button className="bg-white text-sky-600 px-6 py-2 rounded uppercase text-2xl font-bold">
                <NavLink to="/register" onClick={() => handleSignOut()}>
                  Sign Out
                </NavLink>
              </button>
            ) : (
              <button className="bg-white text-sky-600 px-6 py-2 rounded uppercase text-2xl font-bold">
                <NavLink to="/register">Sign In</NavLink>
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <header className="flex justify-between p-8 bg-transparent items-center">
      <div className="hidden md:flex md:w-full">
        {renderWelcomeName()}
        <nav className="flex justify-end ml-auto">
          <ul className="flex space-x-10 items-center justify-end">
            {renderNavLinks()}
            {renderNotLoggedInTabs()}
            {renderIsLoggedInTabs()}
          </ul>
        </nav>
      </div>
      {renderHamburger()}
      {renderMobileMenu()}
    </header>
  );
};

export default Navbar;
