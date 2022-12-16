import { Outlet } from "react-router-dom";
import React from "react";
import bg from "../../assets/img/register_bg_2.png";

/**
 * @description Handles auth listbox and reset password listbox for the application
 */
export default function IndexAuth() {
  return (
    <div className="fixed flex items-center w-full h-full min-h-screen font-Montserrat">
      <div className="absolute top-0 w-full h-full bg-no-repeat bg-full blur-lg">
        <img alt="bg" className="object-contain w-full h-full" src={bg} />
      </div>
      <Outlet />
    </div>
  );
}
