import { NavLink } from "react-router-dom";
import React from "react";

/**
 * @type {React.FC<{}>}
 * @description PageNotFound component for the application
 */
function PageNotFound() {
  return (
    <div className="flex justify-center min-h-screen overflow-hidden text-gray-900 font-Montserrat">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold xl:text-9xl">404</h1>
        <p className="text-3xl font-extrabold xl:text-6xl">
          oh no! page not found
        </p>

        <NavLink to="/">
          <div className="flex items-center justify-center px-8 py-4 mt-16 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out bg-blue-900 rounded-lg hover:bg-teal-600 focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <i className="fas fa-home w-6-ml-2" />
            <h1 className="ml-3 text-center">Go to Home Page</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default PageNotFound;
