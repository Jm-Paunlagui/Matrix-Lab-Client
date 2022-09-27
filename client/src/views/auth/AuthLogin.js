import "react-toastify/dist/ReactToastify.css";

import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

import BackNavigation from "../../components/navbars/BackNavigation";
import { Link } from "react-router-dom";
import React from "react";
import {faSignIn} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/android-chrome-192x192.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * @description User login form for the application
 */
export default function AuthLogin() {

  return (
      <div className="container h-full mx-auto font-Montserrat">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-11/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
            <div className="relative flex flex-col w-full min-w-0 break-words bg-white border-0 rounded-lg">
              <BackNavigation backTo={"/"} hasText={false} isSmall />
              <div className={"pr-6 pl-6"}>
                <div className="flex items-center py-2 text-gray-800">
                  <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                  <h1 className="ml-3 font-extrabold tracking-widest text-md">
                    MATRIX LAB
                  </h1>
                </div>
                <div className="flex-auto pt-0">
                  <h6 className="text-lg font-bold text-gray-500">
                    Sign in to your account
                  </h6>
                  <form className="relative mx-auto mt-6 mb-6 max-w-screen">
                    <input
                        className={`${TEXT_FIELD}`}
                        type="username"
                        placeholder="Username"
                    />
                    <input
                        className={`pr-12 mt-5 mb-5 ${TEXT_FIELD}`}
                        type="password"
                        placeholder="Password"
                    />

                  <div className="flex flex-col justify-center space-y-6">
                    <button
                      type={"button"}
                      className={`px-5 py-3 pl-4 ${PRIMARY_BUTTON}`}
                    >
                      <FontAwesomeIcon
                          icon={faSignIn}
                          className={`${ICON_PLACE_SELF_CENTER}`}
                      />
                      <Link to={"/admin/dashboard"}>Sign in</Link>
                    </button>
                    <hr/>
                    <button type={"button"} className={`${SECONDARY_BUTTON}`}>
                      <Link to={"/forgot-password"}>
                        <h1 className="px-5 py-3">Forgot Password?</h1>
                      </Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}