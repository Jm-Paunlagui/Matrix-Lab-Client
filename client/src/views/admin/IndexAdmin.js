import { Outlet } from "react-router-dom";
import AdminSideNavigationBar from "../../components/navbars/AdminNavigationBar";
import React from "react";

/**
 * @description Handles admin pages for the application
 */
export default function IndexAdmin() {
  return (
    <>
      <AdminSideNavigationBar />
      <div>
        <Outlet />
      </div>
    </>
  );
}
