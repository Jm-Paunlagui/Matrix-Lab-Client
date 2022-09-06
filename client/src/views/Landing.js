import Footer from "../components/footers/footer";
import Navbar from "../components/navbars/navbar";
import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles about, home, leaderboard, privacy, and terms page for the application
 */
export default function Landing() {
  return (
    <>
      <Navbar />
      <div className="bg-white px-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
