import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbars/navbar";
import Footer from "../components/footers/footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
