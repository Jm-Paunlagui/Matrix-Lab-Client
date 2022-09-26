import AdminNavigationBar from "../../components/navbars/AdminNavigationBar";
import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles admin pages for the application
 */
export default function IndexAdmin() {
  return (
    <>
      <AdminNavigationBar />
      <div className="mt-16 font-Montserrat">
        <Outlet />
      </div>
    </>
  );
}
