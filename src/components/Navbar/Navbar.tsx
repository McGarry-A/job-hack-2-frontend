import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeActiveUser } from "../../store/userSlice";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isHome] = useState<boolean>(location.pathname === "/" ? true : false);

  const handleLogOut = () => {
    dispatch(removeActiveUser({ type: "LOGOUT" }));
  };

  const renderWelcomeName = () => {
    const {
      isLoggedIn,
      user: { firstName },
    } = user;
    if (isLoggedIn) {
      return (
        <p>
          Welcome back,{" "}
          <span className="font-semibold text-sky-300 tracking-wider">
            {firstName}
          </span>
        </p>
      );
    }
  };

  const renderIsLoggedInTabs = () => {
    const { isLoggedIn, savedJobs } = user;

    const jobsCount =
      Object.values(savedJobs.appliedJobs).length +
      Object.values(savedJobs.likedJobs).length;

    if (isLoggedIn === true) {
      return (
        <>
          <li>
            <NavLink to="/my-account">
              <button
                className={`border-2 px-4 py-1 ml-4 rounded ${
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
                <span className="absolute -top-3 -right-2 bg-red-600 px-1 text-sm font-semibold rounded-[50%] flex items-center justify-center">
                  {jobsCount}
                </span>
              </button>
            </NavLink>
          </li>
          {/* <li>
            <button
              className="border-2 px-4 py-1 bg-sky-500 border-sky-500 rounded text-gray-50"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          </li> */}
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
              <button
                className={`border-2 px-4 py-1 ml-4 rounded ${
                  isHome
                    ? "text-gray-50 border-gray-50 hover:text-gray-200 hover:border-gray-200"
                    : "text-sky-600 border-sky-600 hover:text-sky-500 hover:border-sky-500"
                }`}
              >
                Log In
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <button className="border-2 px-4 py-1 bg-sky-500 border-sky-500 rounded text-gray-50">
                Register
              </button>
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <header className="flex justify-between p-8 bg-transparent items-center">
      <div>{renderWelcomeName()}</div>
      <nav className="flex justify-end">
        <ul className="flex space-x-5 items-center">
          <li className="cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </li>
          {/* <li className="cursor-pointer">
            <NavLink to="/about">About</NavLink>
          </li> */}
          <li className="cursor-pointer">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {renderNotLoggedInTabs()}
          {renderIsLoggedInTabs()}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
