import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../store";
import { setNotification } from "../store/notificationSlice";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";

const Account = () => {
  const state = useAppSelector((state) => state.user);

  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const newPassConfRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstNameRef.current) firstNameRef.current.value = state.user.firstName;
    if (lastNameRef.current) lastNameRef.current.value = state.user.lastName;
    if (emailRef.current) emailRef.current.value = state.user.email;
  });

  const handleDeleteAccount = () => {
    // keep user details here then =>
    // sign-out
    // delete account

    // send notification that it was successful
    dispatch(
      setNotification({
        state: false,
        status: "success",
        message: "Your account has been successfully deleted!",
      })
    );
  };
  // const handleDeleteCustomer = () => {};
  const handleUpdateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      user: { firstName, lastName, email },
    } = state;

    if (newPassRef.current !== newPassConfRef.current) {
      setError("Passwords do not match.");
    }
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    const newUser = {
      firstName: firstNameRef.current,
      lastName: lastNameRef.current,
      email: emailRef.current,
      password: currentPassRef.current,
    };

    // Once updated

    dispatch(
      setNotification({
        state: false,
        status: "success",
        message: "Your account information has been succesfully updated!",
      })
    );

    return { user, newUser };
  };

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "My Account", link: "/my-account" },
  ];

  const renderSectionHeader = (title: string) => (
    <div className="col-span-2 mb-3">
      <h4 className="text-2xl">{title}</h4>
      {error && <p className="text-sm text-rose-600">*{error}</p>}
    </div>
  );

  const renderUserDetails = () => {
    return (
      <form
        className="grid grid-cols-2 w-full mx-auto gap-3"
        onSubmit={(e) => handleUpdateCustomer(e)}
      >
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
      </form>
    );
  };

  const renderDeleteUserAccount = () => (
    <div>
      {renderSectionHeader("Delete your account")}
      <button
        className="px-3 py-2 border bg-rose-600 text-gray-50 border-rose-600 rounded hover:bg-rose-500 hover:border-rose-500"
        onClick={() => handleDeleteAccount()}
      >
        Delete Account
      </button>
    </div>
  );

  return (
    <div>
      <Navbar />
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageTitle title="My Account" />
        <BGWrapper>
          {renderUserDetails()}
          {renderDeleteUserAccount()}
        </BGWrapper>
      </motion.div>
    </div>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-6xl mx-auto bg-white rounded flex mb-24 flex-col p-8">
    {children}
  </div>
);

export default Account;
