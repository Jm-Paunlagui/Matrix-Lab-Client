import "react-toastify/dist/ReactToastify.css";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  DEFAULT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  ICON_PLACE_SELF_CENTER_2,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description User login form for the application
 */
export default function Login() {
  /**
   * @type {boolean}
   * @description Hook to handle the state of the show and hide password
   * @param showPassword - initial state of the navbar
   * @param setShowPassword - setter of the state of the navbar
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * @description Function to toggle the show and hide password
   */
  const toggleShowPassword = function () {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-max">
          <div className="relative flex flex-col w-full min-w-0 break-words bg-white border-0 rounded-lg">
            <div className="inline-flex">
              <button className={`text-left ${DEFAULT_BUTTON}`}>
                <Link to={"/"}>
                  <h1 className="px-5 py-3">
                    <i
                      className={`fas fa-arrow-left ${ICON_PLACE_SELF_CENTER}`}
                    />
                    Back
                  </h1>
                </Link>
              </button>
            </div>
            <div className={"p-6"}>
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
                <form className="relative mx-auto mt-4 max-w-screen">
                  <input
                    className={`${TEXT_FIELD}`}
                    type="username"
                    placeholder="Username"
                  />
                  <div className="relative mb-8">
                    <input
                      className={`pr-12 mt-5 ${TEXT_FIELD}`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <label className={`${ICON_PLACE_SELF_CENTER_2}`}>
                      {showPassword === false ? (
                        <AiFillEyeInvisible onClick={toggleShowPassword} />
                      ) : (
                        <AiFillEye onClick={toggleShowPassword} />
                      )}
                    </label>
                  </div>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <button className={`${SECONDARY_BUTTON}`}>
                      <Link to={"/forgot-password"}>
                        <h1 className="px-5 py-3">Forgot Password?</h1>
                      </Link>
                    </button>
                    <button
                      className={`px-5 py-3 pl-4 ${PRIMARY_BUTTON}`}
                      type={"button"}
                    >
                      <i
                        className={`fas fa-sign-in-alt ${ICON_PLACE_SELF_CENTER}`}
                      />
                      Sign in
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
