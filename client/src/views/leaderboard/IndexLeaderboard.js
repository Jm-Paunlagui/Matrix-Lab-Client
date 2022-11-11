import LeaderboardNavbar from "../../components/navbars/LeaderboardNavbar";
import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles admin pages for the application
 */
export default function IndexLeaderboard() {
  return (
    <>
      <LeaderboardNavbar />
      <div className="mt-16 font-Montserrat">
        <Outlet />
      </div>
    </>
  );
}
