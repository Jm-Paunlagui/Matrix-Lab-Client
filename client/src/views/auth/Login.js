import "react-toastify/dist/ReactToastify.css";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BACK_BUTTON, FORGOT, ICON_PLACE_SELF_CENTER, ICON_PLACE_SELF_CENTER_2, PRIMARY_BUTTON, TEXT_FIELD }  from "../../assets/styles/input-types-styles";
import React, { useState } from "react";

import {Link} from "react-router-dom";
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
        <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12 ">
          <div className="relative flex flex-col w-full min-w-0 p-6 break-words bg-white border-0 rounded-lg">
            <Link to={"/"}
              className={`${BACK_BUTTON}`}
            >
                <i className={`fas fa-arrow-left pr-2 ${ICON_PLACE_SELF_CENTER}`}/>Back
            </Link>

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
                <div className="relative mb-4">
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
                <Link to={"/forgot-password"} className={`${FORGOT}`}>
                  <h1>Forgot password ?</h1>
                </Link>
                <button
                  className={`${PRIMARY_BUTTON}`}
                  type={"button"}
                >
                  <i className={`fas fa-sign-in-alt ${ICON_PLACE_SELF_CENTER}`} />Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
