import React from "react";
import { Link } from "react-router-dom";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import {
  DEFAULT_BUTTON,
  ICON_PLACE_SELF_CENTER_1,
} from "../../assets/styles/styled-components";

/**
 * @description Back Navigation for the application
 * @param isSmall - boolean to determine if the back navigation is small
 * @param hasText - boolean to determine if the back navigation has text
 * @param backTo - string to determine where the back navigation should go
 * @param pageTitle - string to determine the listbox title of the back navigation
 */
export default function BackNavigation({
  isSmall = true,
  hasText = true,
  backTo,
  pageTitle,
}) {
  return (
    <div
      className={`${
        isSmall
          ? "inline-flex"
          : "fixed top-0 inline-flex flex-wrap items-center w-full p-1 shadow-md backdrop-blur-xl bg-white/50 font-Montserrat"
      }`}
    >
      <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
        <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
          <button className={`text-left ${DEFAULT_BUTTON}`} type={"button"}>
            <Link to={backTo}>
              <h1 className={`${isSmall ? "px-5 py-3" : "px-3 py-3"}`}>
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER_1}`}
                  icon={faArrowLeft}
                />
              </h1>
            </Link>
          </button>
          {hasText ? (
            <h1 className="py-3 overflow-hidden text-lg font-medium text-gray-700 cursor-default text-ellipsis md:text-3xl">
              {pageTitle}
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

BackNavigation.propTypes = {
  isSmall: PropTypes.bool,
  hasText: PropTypes.bool,
  backTo: PropTypes.string,
  pageTitle: PropTypes.string,
};
