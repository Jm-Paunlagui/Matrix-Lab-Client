import "react-toastify/dist/ReactToastify.css";

import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import React, { useState } from "react";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
    textChange: "Sign In",
  });

  /**
   * @description Destructs the state variables
   */
  const { username, password, textChange } = authForm;

  /**
   * @description Handles the Error/Success animation and messages for the login form.
   */
  const [oki, setOki] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

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
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Signing In",
    });
    try {
      const resp = await httpClient.post("/authenticate", {
        username,
        password,
      });
      if (resp.statusText === "OK") {
        setOki(true);
        // Redirect to the dashboard
        window.location.href = resp.data.path;
      }
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
      setOki(false);
      setAuthForm({
        ...authForm,
        textChange: "Sign In",
      });
    }
  };

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words bg-white border rounded-lg shadow-lg 
                ${errorEffect && `animate-wiggle`}`}
            onAnimationEnd={() => setErrorEffect(false)}
          >
            <BackNavigation backTo={"/"} hasText={false} isSmall />
            <div className={"px-6 lg:px-28"}>
              <div className="flex items-center justify-center py-2 text-gray-800">
                <img src={logo} alt="logo" className="w-12 h-12 -mt-12" />
              </div>
              <div className="flex-auto pt-0 mb-24 -mt-14">
                <h6 className="mt-16 text-lg font-bold text-gray-500 xl:text-2xl">
                  Sign in to MATRIX LAB
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
                    name="username"
                    onChange={handleAuthFormChange}
                    onAnimationEnd={() => setErrorEffect(false)}
                    onFocus={() => setErrorMessage("")}
                  />
                  <input
                    className={`pr-12 mt-5 ${TEXT_FIELD} ${
                      errorEffect &&
                      `border-red-500 placeholder-red-500 text-red-500`
                    }`}
                    type="password"
                    placeholder="Password"
                    value={authForm.password}
                    name="password"
                    onChange={handleAuthFormChange}
                    onAnimationEnd={() => setErrorEffect(false)}
                    onFocus={() => setErrorMessage("")}
                  />

                  {/* Error message */}
                  {errorMessage ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="flex flex-col justify-center mt-6 space-y-6">
                    <button
                      type="submit"
                      className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                    >
                      {oki ? (
                          <svg className="spinner mr-1" viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="transparent" strokeWidth="5" />
                          </svg>
                      ) : (
                        <FontAwesomeIcon
                          icon={faSignIn}
                          className={`${ICON_PLACE_SELF_CENTER}`}
                        />
                      )}

                      {textChange}
                    </button>

                    <button type={"button"} className={`${SECONDARY_BUTTON}`}>
                      <Link to={"/forgot-password"}>
                        <h1 className="px-5 py-1">Forgot Password?</h1>
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
