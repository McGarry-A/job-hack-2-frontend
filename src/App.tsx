import React from "react";
import "./App.css";
import Home from "./routes/Home";

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="max-w-[1920px] mx-auto">{children}</div>;
};

const App = () => {
  return (
    <div className="w-screen h-screen font-leagueSpartan border-yellow-500 border-2">
      <ContentWrapper>
        <Home />
      </ContentWrapper>
    </div>
  );
};

export default App;
