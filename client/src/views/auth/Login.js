import "react-toastify/dist/ReactToastify.css";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @type {React.FC<{}>}
 * @description User login form for the application
 */
function Login() {
  /**
   * @type {boolean}
   * @description Hook to handle the state of the show and hide password
   * @param showPassword - initial state of the navbar
   * @param setShowPassword - setter of the state of the navbar
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * @type {function}
   * @description Function to toggle the show and hide password
   */
  const toggleShowPassword = function () {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="container h-full mx-auto font-Montserrat">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
              <div className="px-6 py-6 mb-0 rounded-t">
                <Link to="/">
                  <div className="flex items-center px-3 py-2 text-gray-800 hover:backdrop-blur-md hover:bg-blue-50 hover:rounded-md">
                    <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                    <h1 className="ml-3 font-extrabold tracking-widest text-md">
                      MATRIX LAB
                    </h1>
                  </div>
                </Link>
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 text-start">
                  <h6 className="text-lg font-bold text-gray-500">
                    Sign in to your account
                  </h6>
                </div>

                <form className="relative mx-auto mt-6 mb-6 max-w-screen">
                  <input
                    className="w-full p-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="username"
                    placeholder="ID"
                  />
                  <div className="relative">
                    <input
                      className="w-full px-4 py-4 pr-12 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <label className="absolute px-2 text-2xl rounded py-9 right-2">
                      {showPassword === false ? (
                        <div className="text-gray-400">
                          <AiFillEyeInvisible onClick={toggleShowPassword} />
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <AiFillEye onClick={toggleShowPassword} />
                        </div>
                      )}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-teal-700 rounded-lg hover:bg-blue-900 focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt w-6-ml-2" />
                    <span className="ml-3">Sign In</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container h-full mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
              <div className="px-6 py-6 mb-0 rounded-t">
                <div className="flex items-center px-3 py-2 text-gray-800 ">
                  <Link to="/forgot-password">
                    <div className="ml-3 font-medium tracking-widest text-md">
                      Forgot Password?
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
