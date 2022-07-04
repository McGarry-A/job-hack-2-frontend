import Navbar from "../components/Navbar/Navbar";
import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import React from "react";

const Contact = () => {
  const renderBreadcrumbs = () => {
    return (
      <div className="flex space-x-2 items-center justify-center my-10">
        <NavLink
          to="/"
          className="opacity-50 text-xs uppercase tracking-widest"
        >
          Home
        </NavLink>
        <GrFormNext size={"1.5rem"} />
        <NavLink to="/contact" className="text-xs uppercase tracking-widest">
          Contact
        </NavLink>
      </div>
    );
  };

  const renderHero = () => {
    return (
      <div className="my-10 mx-auto text-center">
        <h2 className="text-5xl font-semibold">Contact JobHack</h2>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      {renderBreadcrumbs()}
      {renderHero()}
    </div>
  );
};

export default Contact;
