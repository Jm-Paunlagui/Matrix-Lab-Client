import UserNavigationBar from "../../components/navbars/UserNavigationBar";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { isAuth } from "../../helpers/Auth";
import BreadCrumb from "../../components/breadcrumb/Breadcrumb";

/**
 * @description Handles admin pages for the application
 */
export default function IndexUser() {
  return isAuth().role === "user" ? (
    <>
      <UserNavigationBar />
      <div className="mt-16 font-Montserrat">
          <BreadCrumb />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/unauthorized-access" />
  );
}
