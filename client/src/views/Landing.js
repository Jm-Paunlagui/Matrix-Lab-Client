import Footer from "../components/footers/footer";
import Navbar from "../components/navbars/navbar";
import { Outlet } from "react-router-dom";
import React from "react";

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
