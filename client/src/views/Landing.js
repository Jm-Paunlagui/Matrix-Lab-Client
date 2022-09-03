import Footer from "../components/footers/footer";
import Navbar from "../components/navbars/navbar";
import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @type {React.FC<{}>}
 * @description Handles about, home, leaderboard, privacy, and terms page for the application
 */
function Landing() {
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
