import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Account = () => {
  const renderBreadcrumbs = () => (
    <div className="flex space-x-2 items-center justify-center my-12">
      <NavLink
        to="/"
        className="opacity-50 text-xs uppercase tracking-widest mt-1"
      >
        Home
      </NavLink>
      <GrFormNext size={"1.3rem"} className="opacity-50" />
      <NavLink to="/my-jobs" className="text-xs uppercase tracking-widest mt-1">
        My Account
      </NavLink>
    </div>
  );

  const renderHeader = () => (
    <div className="my-10 mx-auto text-center">
      <h2 className="text-5xl font-semibold">My Account</h2>
    </div>
  );

  return (
    <div>
      <Navbar />
      {renderBreadcrumbs()}
      {renderHeader()}
    </div>
  );
};

export default Account;
