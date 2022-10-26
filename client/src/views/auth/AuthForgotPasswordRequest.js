import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  faCircleCheck,
  faCircleRight,
  faEnvelope,
  faForward,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessAnimation from "actually-accessible-react-success-animation";

import logo from "../../assets/img/android-chrome-192x192.png";
import {
  EMAIL_NOT_SET,
  ICON_PLACE_SELF_CENTER,
  LOADING_ANIMATION,
  PRIMARY_BUTTON,
  PRIMARY_RADIO,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import BackNavigation from "../../components/navbars/BackNavigation";
import httpClient from "../../http/httpClient";
import { maskEmail } from '../../helpers/masker';

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
    confirm_email: "",
    mask: "",
    id1: "",
    id2: "",
    textChange: "Next",
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
    setResetForm({ ...resetForm, [name]: value });
  };
  /**
   * @description For step counter in the forgot password form.
   */

  const [count, setCount] = useState(1);
  /**
   * @description Destructs the state variables
   */

  const { username, email, confirm_email, id1, id2, textChange } = resetForm; // Hide email address with mask

  /**
   * @description Handles the form submission and makes a POST request to the backend to check user email.
   * @param event
   * @returns {Promise<void>}
   */

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({ ...resetForm, textChange: "Verifying" });

    try {
      await httpClient
        .post("/user/check-email", {
          username,
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setResetForm({
              ...resetForm,
              id1: response.data.email[0],
              id2: response.data.email[1],
              textChange: "Continue",
            });
            setCount(count + 1);
          }
        })
        .finally(() => {
          setOki(false);
        });
    } catch (error) {
      setErrorEffect(true);
      setOki(false);
      setErrorMessage(error.response.data.message);
      setResetForm({ ...resetForm, textChange: "Next" });
    }
  };
  /**
   * @description To make a user choose, which email address to use. If the user has multiple email addresses.
   * @param event
   * @returns {Promise<void>}
   */

  const handleVerifyEmailSubmit = async (event) => {
    setOki(true);
    event.preventDefault();

    try {
      if (confirm_email !== "") {
        setResetForm({ ...resetForm, textChange: "Verify Email" });
        setCount(count + 1);
        setOki(false);
      } else {
        setErrorEffect(true);
        setOki(false);
        setErrorMessage("Choose an email");
      }
    } catch (error) {
      setErrorEffect(true);
      setOki(false);
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
    setResetForm({ ...resetForm, textChange: "Sending" });
    try {
      await httpClient
        .post("/user/forgot-password", {
          email,
          confirm_email,
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setOk(true);
            setResetForm({ ...resetForm, textChange: "Success" });
          }
        });
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
      setOki(false);
      setResetForm({ ...resetForm, textChange: "Verify Email" });
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
                <SuccessAnimation color="#5cb85c" text="Success!" />
                <div className="px-6 space-y-6 text-center text-gray-500">
                  <p className="text-lg">
                    We&#39;ve sent you an email with a link to reset your
                    password. Please check your inbox.
                  </p>
                  <p className="text-lg">
                    If you don&#39;t see it, check your spam folder.
                  </p>
                  <div className="flex flex-col justify-center">
                    <button className={`${PRIMARY_BUTTON}`} type={"button"}>
                      <Link to={"/auth"}>
                        <h1 className="px-5 py-1">
                          Done?
                          <FontAwesomeIcon
                            className={`ml-2 ${ICON_PLACE_SELF_CENTER}`}
                            icon={faSignIn}
                            size={"lg"}
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
                  <img alt="logo" className="w-12 h-12 -mt-12" src={logo} />
                </div>
                <h1> Step {count} of 3</h1>
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
                    ) : count === 2 ? (
                      <p className="text-gray-500">
                        Choose an email address to receive the password reset
                        link.
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Please confirm your email address below. with the email
                        address of <b>{maskEmail(confirm_email)}</b>
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
                        name="username"
                        onAnimationEnd={() => setErrorEffect(false)}
                        onChange={handleFormChange}
                        onFocus={() => setErrorMessage("")}
                        placeholder="username"
                        type="username"
                        value={username}
                      />
                      {/* Error message */}
                      {errorMessage ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                          {errorMessage}
                        </div>
                      ) : null}
                      <div className="flex flex-col justify-center mt-6 space-y-6">
                        <button
                          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
                            count === 2 ? "hidden" : ""
                          }`}
                          type="submit"
                        >
                          {oki ? (
                            LOADING_ANIMATION()
                          ) : (
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faCircleRight}
                              size={"lg"}
                            />
                          )}
                          {textChange}
                        </button>
                      </div>
                    </form>
                  ) : count === 2 ? (
                    <form
                      className="relative mx-auto mt-6 mb-6 max-w-screen"
                      onSubmit={handleVerifyEmailSubmit}
                    >
                      {/*  Choice of identity */}
                      <div className="flex flex-col justify-center mt-6 space-y-6">
                        {id1 ? (
                          <li className={`list-none`}>
                            <input
                              checked={confirm_email === id1}
                              className={`sr-only peer`}
                              id="id1"
                              name="confirm_email"
                              onAnimationEnd={() => setErrorEffect(false)}
                              onChange={handleFormChange}
                              onFocus={() => setErrorMessage("")}
                              type="radio"
                              value={id1}
                            />
                            <label
                              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                                errorEffect
                                  ? `border-red-500 placeholder-red-500 text-red-500`
                                  : PRIMARY_RADIO
                              }`}
                              htmlFor="id1"
                            >
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faEnvelope}
                                size={"lg"}
                              />
                              <p className="truncate">Email {maskEmail(id1)}</p>
                            </label>
                          </li>
                        ) : (
                          EMAIL_NOT_SET("Primary")
                        )}
                        {id2 ? (
                          <li className="list-none">
                            <input
                              checked={confirm_email === id2}
                              className="sr-only peer "
                              id="id2"
                              name="confirm_email"
                              onAnimationEnd={() => setErrorEffect(false)}
                              onChange={handleFormChange}
                              onFocus={() => setErrorMessage("")}
                              type="radio"
                              value={id2}
                            />
                            <label
                              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                                errorEffect
                                  ? `border-red-500 placeholder-red-500 text-red-500`
                                  : PRIMARY_RADIO
                              } `}
                              htmlFor="id2"
                            >
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faEnvelope}
                                size={"lg"}
                              />
                              <p className="truncate">Email {maskEmail(id2)}</p>
                            </label>
                          </li>
                        ) : (
                          EMAIL_NOT_SET("Recovery")
                        )}
                      </div>
                      {/* Error message */}
                      {errorMessage ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                          {errorMessage}
                        </div>
                      ) : null}
                      <div className="flex flex-col justify-between mt-6 space-y-6">
                        <button
                          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                          type="submit"
                        >
                          {oki ? (
                            LOADING_ANIMATION()
                          ) : (
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faForward}
                              size={"lg"}
                            />
                          )}
                          {textChange}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <form
                        className="relative mx-auto max-w-screen"
                        onSubmit={handleEmailSubmit}
                      >
                        <input
                          className={`${TEXT_FIELD} ${
                            errorEffect &&
                            `border-red-500 placeholder-red-500 text-red-500`
                          }`}
                          name="email"
                          onAnimationEnd={() => setErrorEffect(false)}
                          onChange={handleFormChange}
                          onFocus={() => setErrorMessage("") && setOki(false)}
                          placeholder="Email"
                          type="email"
                          value={email}
                        />
                        {/* Error message */}
                        {errorMessage ? (
                          <div className="mt-2 text-sm font-semibold text-red-500">
                            {errorMessage}
                          </div>
                        ) : null}
                        <div className="flex flex-col justify-between mt-6 space-y-6">
                          <button
                            className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                            type="submit"
                          >
                            {oki ? (
                              LOADING_ANIMATION()
                            ) : (
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faCircleCheck}
                                size={"lg"}
                              />
                            )}
                            {textChange}
                          </button>
                        </div>
                      </form>
                      <button
                        className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
                          count === 1 ? "hidden" : ""
                        }`}
                        disabled={count > 3}
                        onClick={() => {
                          setCount(count - 1);
                          setResetForm({ ...resetForm, textChange: "Next" });
                          setErrorMessage("");
                        }}
                        type="button"
                      >
                        Previous
                      </button>
                    </>
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
