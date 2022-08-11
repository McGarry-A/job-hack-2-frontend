import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Account from "./routes/Account";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import JobDetails from "./routes/JobDetails";
import MyJobs from "./routes/MyJobs";
import Register from "./routes/Register";

const App = () => {
  const location = useLocation();

  return (
    <div className="w-screen font-leagueSpartan bg-gradient-to-b from-[#f2f2f2] to-[#ffffff]">
      <AnimatePresence>
        <div>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/my-account" element={<Account />} />
            <Route path="/job-profile/:id" element={<JobDetails />} />
          </Routes>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default App;
