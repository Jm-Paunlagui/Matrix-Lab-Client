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
import SuccessAnimation from "actually-accessible-react-success-animation";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Handles the forgot password request page
 */
export default function AuthForgotPasswordRequest() {
  /**
   * @description State variables for the forgot password form.
   */
  const [resetForm, setResetForm] = useState({
    username: "",
    email: "",
    emailConfirmation: "",
    textChange: "Confirm Email",
  });

  /**
   * @description Handles the Error/Success animation and messages for the forgot password form.
   */
  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * @description Handles the change of the input fields
   * @param event
   */
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setResetForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * @description For step counter in the forgot password form.
   */
  const [count, setCount] = React.useState(1);

  /**
   * @description Destructs the state variables
   */
  const { username, email, emailConfirmation, textChange } = resetForm;

  /**
   * @description Handles the form submission and makes a POST request to the backend to check user email.
   * @param event
   * @returns {Promise<void>}
   */
  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await httpClient.post("/user/check-email", { username });
      if (resp.statusText === "OK") {
        setResetForm({
          username,
          email: "",
          emailConfirmation: resp.data.email,
          textChange: "Confirm Email",
        });
        setCount(count + 1);
      }
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
    }
  };

  /**
   * @description Handles the form submission and makes a POST request to the backend to send the email.
   * @param event
   * @returns {Promise<void>}
   */
  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({
      ...resetForm,
      textChange: "Sending",
    });
    try {
      const resp = await httpClient.post("/user/forgot-password", {
        email,
      });
      if (resp.statusText === "OK") {
        setOk(true);
      }
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
      setOki(false);
      setResetForm({
        ...resetForm,
        textChange: "Confirm Email",
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
            <BackNavigation backTo={"/auth"} hasText={false} isSmall />
            {ok ? (
              <div className="py-12 bg-white rounded-lg shadow-lg">
                <SuccessAnimation text="Success!" color="#5cb85c" />
                <div className="px-6 space-y-6 text-center text-gray-500">
                  <p className="text-lg">
                    We&#39;ve sent you an email with a link to reset your
                    password. Please check your inbox.
                  </p>
                  <p className="text-lg">
                    If you don&#39;t see it, check your spam folder.
                  </p>
                  <div className="flex flex-col justify-center">
                    <button type={"button"} className={`${PRIMARY_BUTTON}`}>
                      <Link to={"/auth"}>
                        <h1 className="px-5 py-1">
                          Done?
                          <FontAwesomeIcon
                            icon={faSignIn}
                            className={`ml-2 ${ICON_PLACE_SELF_CENTER}`}
                          />{" "}
                          Sign in
                        </h1>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={"px-6 lg:px-28"}>
                <div className="flex items-center justify-center py-2 text-gray-800">
                  <img src={logo} alt="logo" className="w-12 h-12 -mt-12" />
                </div>
                <h1> Step {count} of 2</h1>
                <div className="flex-auto mb-24 space-y-6 -mt-14">
                  <div className="mb-3 text-start">
                    <h6 className="mt-16 text-lg font-bold text-gray-500 xl:text-2xl">
                      Forgot Password?
                    </h6>
                  </div>
                  <div className="mb-3 text-start">
                    {count === 1 ? (
                      <p className="text-gray-500">
                        Enter your username below and proceed to the next step.
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Please confirm your email address below. with the email
                        address of <b>{emailConfirmation}</b>
                      </p>
                    )}
                  </div>
                  {count === 1 ? (
                    <form
                      className="relative mx-auto max-w-screen"
                      onSubmit={handleUsernameSubmit}
                    >
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffect &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        type="username"
                        placeholder="username"
                        value={username}
                        name="username"
                        onChange={handleFormChange}
                        onAnimationEnd={() => setErrorEffect(false)}
                        onFocus={() => setErrorMessage("")}
                      />
                      {/* Error message */}
                      {errorMessage ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                          {errorMessage}
                        </div>
                      ) : null}
                      <button
                        className={`px-5 py-1 pl-4 w-full mt-6 ${PRIMARY_BUTTON} ${
                          count === 2 ? "hidden" : ""
                        }`}
                        type="submit"
                      >
                        Next
                      </button>
                    </form>
                  ) : (
                    <form
                      className="relative mx-auto max-w-screen"
                      onSubmit={handleEmailSubmit}
                    >
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffect &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleFormChange}
                        onAnimationEnd={() => setErrorEffect(false)}
                        onFocus={() => setErrorMessage("") && setOki(false)}
                      />
                      {/* Error message */}
                      {errorMessage ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                          {errorMessage}
                        </div>
                      ) : null}
                      <div className="flex flex-col justify-between mt-6 space-y-6">
                        <button
                          className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
                            count === 1 ? "hidden" : ""
                          }`}
                          type="button"
                          onClick={() => setCount(count - 1)}
                          disabled={count === 1}
                        >
                          Previous
                        </button>
                        <button
                          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                          type="submit"
                        >
                          {oki ? (
                            <svg className="spinner mr-1" viewBox="0 0 50 50">
                              <circle
                                className="path"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="transparent"
                                strokeWidth="5"
                              />
                            </svg>
                          ) : null}
                          {textChange}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
