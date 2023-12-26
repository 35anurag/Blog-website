// "use client"
import React from "react";

// import Navbar from "./components/Navbar";
import Home from "./home/page";
import Top from "./top/page";
// import CreatePost from "./createpost/page"
// import Login from "./login/page";
// import { AuthContextProvider } from "./context/AuthContext";

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
