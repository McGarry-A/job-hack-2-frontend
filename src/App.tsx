import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Modal from "./components/Layout/Modal/Modal";
import Account from "./routes/Account";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import JobDetails from "./routes/JobDetails";
import MyJobs from "./routes/MyJobs";
import Register from "./routes/Register";
import { useAppSelector } from "./store";

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="max-w-[1920px] mx-auto -z-10">{children}</div>;
};

const App = () => {
  const notificationState = useAppSelector((state) => state.notification);
  const location = useLocation();
  const {
    status: notifStatus,
    state: notifState,
    message: notifMessage,
  } = notificationState;

  const renderNotificationModal = ({
    status,
    message,
  }: {
    status: "error" | "success";
    message: string;
  }) => {
    return (
      <Modal isHidden={notifState}>
        <div className="flex flex-col space-y-1">
          <h3
            className={`text-xl font-semibold ${
              status === "error" ? "text-rose-600" : "text-sky-500"
            }`}
          >
            {status === "error" ? "There was an error" : "Success"}
          </h3>
          <p className="text-sm opacity-50">{message}</p>
        </div>
      </Modal>
    );
  };

  return (
    <div className="w-screen font-leagueSpartan bg-gradient-to-b from-[#f2f2f2] to-[#ffffff]">
      <AnimatePresence>
        <ContentWrapper>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/my-account" element={<Account />} />
            <Route path="/job-profile/:id" element={<JobDetails />} />
          </Routes>
        </ContentWrapper>
      </AnimatePresence>
      {renderNotificationModal({
        status: notifStatus,
        message: notifMessage,
      })}
    </div>
  );
};

export default App;
