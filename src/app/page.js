import React from "react";
import Home from "./home/page";
import Top from "./top/page";

const page = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Top />
      <Home />
      {children}
    </div>
  );
};

export default page;
