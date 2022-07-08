import React, { useEffect, useRef } from "react";
import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useAppSelector } from "../store";

const Account = () => {
  const state = useAppSelector((state) => state.user);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstNameRef.current) firstNameRef.current.value = state.user.firstName;
    if (lastNameRef.current) lastNameRef.current.value = state.user.lastName;
    if (emailRef.current) emailRef.current.value = state.user.email;
  }, []);

  const handleDeleteCustomer = () => {};
  const handleUpdateCustomer = () => {};

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

  const renderSectionHeader = (title: string) => (
    <div className="col-span-2 mb-3">
      <h4 className="text-2xl">{title}</h4>
    </div>
  );

  const renderUserDetails = () => {
    return (
      <div className="grid grid-cols-2 w-full mx-auto gap-3 ">
        {renderSectionHeader("Edit user information")}
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            ref={firstNameRef}
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            ref={lastNameRef}
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block">Email</label>
          <input
            type="text"
            ref={emailRef}
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="">
          <label className="block">Confirm Current Password</label>
          <input
            type="password"
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div></div>
        <div className="">
          <label className="block">New Password</label>
          <input
            type="password"
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="">
          <label className="block">Confirm New Password</label>
          <input
            type="password"
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>

        <div className="my-10">
          <button
            className="px-3 py-2 border bg-sky-400 text-gray-50 border-sky-400 rounded hover:bg-sky-300 hover:border-sky-300"
            type="submit"
          >
            Update User
          </button>
        </div>
      </div>
    );
  };

  const renderDeleteUserAccount = () => (
    <div>
      {renderSectionHeader("Delete your account")}
      <button className="px-3 py-2 border bg-rose-600 text-gray-50 border-rose-600 rounded hover:bg-rose-500 hover:border-rose-500">
        Delete Account
      </button>
    </div>
  );

  return (
    <div>
      <Navbar />
      {renderBreadcrumbs()}
      {renderHeader()}
      <BGWrapper>
        {renderUserDetails()}
        {renderDeleteUserAccount()}
      </BGWrapper>
    </div>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-6xl mx-auto bg-white rounded flex mb-24 flex-col p-8">
    {children}
  </div>
);

export default Account;
