import React from "react";
import {DEFAULT_BUTTON, ICON_PLACE_SELF_CENTER} from "../../assets/styles/styled-components";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function BackTo({to, text}) {
    BackTo.propTypes = {
        to: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }
    return (
        <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
            <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                <button className={`text-left ${DEFAULT_BUTTON}`} type={"button"}>
                    <Link to={to}>
                        <h1 className="px-5 py-3">
                            <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faArrowLeft}
                            />
                            {text}
                        </h1>
                    </Link>
                </button>
            </div>
        </div>
  );
}