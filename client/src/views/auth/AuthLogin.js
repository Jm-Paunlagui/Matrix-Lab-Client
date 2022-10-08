import "react-toastify/dist/ReactToastify.css";

import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import React, { useState } from "react";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description User login form for the application
 */
export default function AuthLogin() {
  /**
   * @description State variables for the login form.
   * @param {string} email - Email of the user.
   * @param {string} password - Password of the user.
   */
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
  });

  /**
   * @description Handles the Error animation for the login form.
   */
  const [errorEffect, setErrorEffect] = useState(false);

  /**
   * @description Handles the change of the input fields in the login form.
   * @param event
   */
  const handleAuthFormChange = (event) => {
    const { name, value } = event.target;
    setAuthForm({
      ...authForm,
      [name]: value,
    });
  };

  /**
   * @description Handles the form submission and makes a POST request to the backend.
   * @param event
   */
  const handleAuthFormSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = authForm;
    try {
      const resp = await httpClient.post("/authenticate", {
        username,
        password,
      });
      if (resp.statusText === "OK") {
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
      setErrorEffect(true);
    }
  };

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words bg-white border rounded-lg shadow-lg 
                ${errorEffect && `animate-wiggle`}`}
            onAnimationEnd={() => setErrorEffect(false)}
          >
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
                <form
                  className="relative mx-auto mt-6 mb-6 max-w-screen"
                  onSubmit={handleAuthFormSubmit}
                >
                  <input
                    className={`${TEXT_FIELD} ${
                      errorEffect &&
                      `border-red-500 placeholder-red-500 text-red-500`
                    }`}
                    type="username"
                    placeholder="Username"
                    value={authForm.username}
                    onChange={handleAuthFormChange}
                    onAnimationEnd={() => setErrorEffect(false)}
                  />
                  <input
                    className={`pr-12 mt-5 mb-5 ${TEXT_FIELD} ${
                      errorEffect &&
                      `border-red-500 placeholder-red-500 text-red-500`
                    }`}
                    type="password"
                    placeholder="Password"
                    value={authForm.password}
                    onChange={handleAuthFormChange}
                    onAnimationEnd={() => setErrorEffect(false)}
                  />

                  <div className="flex flex-col justify-center space-y-6">
                    <button
                      type="submit"
                      className={`px-5 py-3 pl-4 ${PRIMARY_BUTTON}`}
                    >
                      <FontAwesomeIcon
                        icon={faSignIn}
                        className={`${ICON_PLACE_SELF_CENTER}`}
                      />
                      Sign in
                    </button>
                    <hr />
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
