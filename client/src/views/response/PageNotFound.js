import { NavLink } from "react-router-dom";
import React from "react";
import { ICON_PLACE_SELF_CENTER, PRIMARY_BUTTON } from '../../assets/styles/input-types-styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

/**
 * @description PageNotFound component for the application
 */
export default function PageNotFound() {
  return (
    <div className="flex justify-center min-h-screen overflow-hidden text-gray-900 font-Montserrat">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold xl:text-9xl">404</h1>
        <p className="text-3xl font-extrabold xl:text-6xl">
          oh no! page not found
        </p>

        <NavLink to="/">
          <div className={`px-5 py-1 flex flex-row justify-center mt-16 ${PRIMARY_BUTTON}`}>
            <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faHome}
            />
            <h1 className="text-center">Go to Home Page</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
