import Footer from "../../components/footers/Footer";
import Navbar from "../../components/navbars/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles about, home, leaderboard, privacy, and terms page for the application
 */
export default function IndexPub() {
  return (
    <>
      <Navbar />
      <div className="px-6 bg-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
