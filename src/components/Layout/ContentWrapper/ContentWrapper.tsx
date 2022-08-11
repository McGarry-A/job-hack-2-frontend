import React from "react";

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="max-w-[1920px] mx-auto -z-10">{children}</div>;
};

export default ContentWrapper;
