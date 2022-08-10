import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar/Navbar";
import { useAppSelector } from "../store";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import AccountForm from "../components/Forms/AccountForm/AccountForm";

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

  useEffect(() => {
    if (firstNameRef.current) firstNameRef.current.value = state.user.firstName;
    if (lastNameRef.current) lastNameRef.current.value = state.user.lastName;
    if (emailRef.current) emailRef.current.value = state.user.email;
  });

  const handleDeleteAccount = () => {
    toast({
      status: "success",
      title: "Account Deleted",
      description: "Your account has been deleted",
    });
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
    </div>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-6xl mx-auto bg-white rounded flex mb-24 flex-col p-8">
    {children}
  </div>
);

export default Account;
