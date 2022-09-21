import AdminNavigationBar from "../../components/navbars/AdminNavigationBar";
import { Outlet } from "react-router-dom";
import React from "react";
import bg from "../../assets/img/register_bg_2.png";

/**
 * @description Handles admin pages for the application
 */
export default function IndexAdmin() {
  return (
    <>
        <AdminNavigationBar />
        <div className="mt-16 bg-white font-Montserrat">
            <Outlet />
        </div>
    </>
  );
}
