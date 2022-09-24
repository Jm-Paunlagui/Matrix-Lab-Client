import { Outlet } from "react-router-dom";
import React from "react";
import bg from "../../assets/img/register_bg_2.png";

/**
 * @description Handles auth page and reset password page for the application
 */
export default function IndexAuth() {
  return (
    <div className="fixed flex items-center w-full h-full min-h-screen bg-blue-100 font-Montserrat">
      <div className="absolute top-0 w-full h-full bg-no-repeat bg-full blur-lg">
        <img src={bg} alt="bg" className="object-contain w-full h-full" />
      </div>
      <Outlet />
    </div>
  );
}
