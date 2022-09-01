import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../store";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import AccountForm from "../components/Forms/AccountForm/AccountForm";
import { removeActiveUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../components/Layout/ContentWrapper/ContentWrapper";
import deleteUser from "../utils/deleteUser";

const Account = () => {
  const state = useAppSelector((state) => state.user);

  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const newPassConfRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (firstNameRef.current) firstNameRef.current.value = state.user.firstName;
    if (lastNameRef.current) lastNameRef.current.value = state.user.lastName;
    if (emailRef.current) emailRef.current.value = state.user.email;
  });

  const handleDeleteAccount = async () => {
    const isDeleted = await deleteUser(state.user.email);

    if (isDeleted) {
      toast({
        status: "success",
        title: "Account Deleted",
        description: "Your account has been deleted",
      });

      return;
    }

    toast({
      status: "error",
      title: "Error",
      description:
        "There was a problem deleting your account, plase try again later.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Log out succesful",
      status: "success",
      description: "You have been logged out of your account",
    });

    dispatch(removeActiveUser());
    navigate("/");
  };

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

    toast({
      title: "Update Successful",
      status: "success",
      description: "Your account information has been succesfully updated!",
    });

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

  const renderDeleteUserAccount = () => {
    const { isLoggedIn } = state;

    return (
      <div className="">
        {renderSectionHeader("Manage Your Account")}
        <button
          className="w-40 py-2 border bg-rose-600 text-gray-50 border-rose-600 rounded hover:bg-rose-500 hover:border-rose-500"
          onClick={() => handleDeleteAccount()}
        >
          Delete Account
        </button>
        {isLoggedIn && (
          <button
            onClick={() => handleLogout()}
            className={`border-2 w-40 py-2 rounded text-rose-600 border-rose-600 hover:text-rose-500 hover:border-rose-500 ml-4`}
          >
            Log out
          </button>
        )}
      </div>
    );
  };

  return (
    <ContentWrapper>
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
          {renderSectionHeader("Edit user information")}
          <AccountForm
            emailRef={emailRef}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            handleUpdateCustomer={handleUpdateCustomer}
          />
          {renderDeleteUserAccount()}
        </BGWrapper>
      </motion.div>
    </ContentWrapper>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-6xl mx-auto bg-white rounded flex mb-24 flex-col p-8">
    {children}
  </div>
);

export default Account;
