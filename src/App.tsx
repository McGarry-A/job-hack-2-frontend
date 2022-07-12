import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import About from "./routes/About";
import Account from "./routes/Account";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import MyJobs from "./routes/MyJobs";
import Register from "./routes/Register";

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="max-w-[1920px] mx-auto -z-10">{children}</div>;
};

const App = () => {
  return (
    <div className="w-screen font-leagueSpartan bg-gradient-to-b from-[#f2f2f2] to-[#ffffff]">
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/my-account" element={<Account />} />
        </Routes>
      </ContentWrapper>
    </div>
  );
};

export default App;
