import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles admin pages for the application
 */
export default function IndexInsights() {
  return (
      <div className="mt-16 font-Montserrat bg-blue-50">
        <Outlet />
      </div>
  );
}
