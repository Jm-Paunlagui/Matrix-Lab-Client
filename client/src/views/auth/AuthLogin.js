import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  faEnvelope,
  faRepeat,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { toast } from "react-toastify";

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
    textChange2: "",
    email: "",
    id1: "",
    id2: "",
    id3: "",
    code: "",
    buttonDisabled: true,
  });

  const navigate = useNavigate();

  /**
   * @description Destructs the state variables
   */
  const {
    username,
    password,
    textChange,
    textChange2,
    email,
    id1,
    id2,
    id3,
    code,
    buttonDisabled,
  } = authForm;

  /**
   * @description Handles the Error/Success animation and messages for the login form.
   */
  const [oki, setOki] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countDown, setCountDown] = useState(0);

  /**
   * @description For step counter in the forgot password form.
   */
  const [count, setCount] = useState(1);

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
   * @description Count down function to reset the 2FA code after 30 seconds.
   */
  function countDownFunction() {
    setCountDown(countDown - 1);
  }

  /**
   * @description useEffect to reset the 2FA code after 30 seconds
   */
  useEffect(() => {
    if (count >= 3) {
      if (countDown > 0) {
        setTimeout(countDownFunction, 1000);
        setAuthForm({
          ...authForm,
          buttonDisabled: true,
        });
      } else {
        setAuthForm({
          ...authForm,
          code: "",
          buttonDisabled: false,
        });
      }
    }
  }, [countDown]);

  /**
   * @description Handles the auth form submission and makes a POST request to the backend.
   * @param event
   */
  const handleAuthFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Signing In",
    });
    await httpClient
      .post("/user/authenticate", {
        username,
        password,
      })
      .then((response) => {
        setAuthForm({
          ...authForm,
          id1: response.data.emails[0],
          id2: response.data.emails[1],
          id3: response.data.emails[2],
          textChange: "Verify email",
        });
        setCount(count + 1);
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setAuthForm({
          ...authForm,
          textChange: "Sign In",
        });
      });
  };

  /**
   * @description Sends the 2FA code to the users email.
   * @param event
   * @returns {Promise<void>}
   */
  const handle2FAFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Sending Code",
    });
    await httpClient
      .post("/user/checkpoint-2fa", {
        email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "info" });
        setCountDown(30);
        setCount(count + 1);
        setAuthForm({
          ...authForm,
          textChange: "Verify code",
          textChange2: "Resend code",
        });
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setAuthForm({
          ...authForm,
          textChange: "Verify",
        });
      });
  };

  /**
   * @description Verifies the 2FA code and makes a POST request to the backend.
   * @param event
   * @returns {Promise<void>}
   */
  const handle2FAVerifyFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Verifying",
    });
    await httpClient
      .post("/user/verify-2fa", {
        code,
      })
      .then((response) => {
        toast(`Welcome back ${username}!`, {
          type: "success",
          bodyClassName: "toastify-body",
        });
        setAuthForm({
          ...authForm,
          textChange: "Success",
        });
        navigate(response.data.path);
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setAuthForm({
          ...authForm,
          code: "",
          textChange: "Verify",
        });
      });
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
                <img alt="logo" className="w-12 h-12 -mt-12" src={logo} />
              </div>
              <div className="flex-auto pt-0 mb-24 -mt-14">
                <h6 className="mt-16 text-lg font-bold text-gray-500 xl:text-2xl">
                  {count === 1
                    ? "Sign in to MATRIX LAB"
                    : count === 2
                    ? "Verify your identity"
                    : "Two-factor authentication"}
                </h6>
                <div className="mt-4 text-start">
                  {count === 1 ? null : count === 2 ? (
                    <p className="text-gray-500">{authForm.username}</p>
                  ) : (
                    <p className="text-gray-500">
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faEnvelope}
                        size={"lg"}
                      />
                      We emailed a code to {email}. Please enter the code to
                      sign in.
                    </p>
                  )}
                </div>
                {count === 1 ? (
                  <form
                    className="relative mx-auto mt-6 mb-6 max-w-screen"
                    onSubmit={handleAuthFormSubmit}
                  >
                    <input
                      className={`${TEXT_FIELD} ${
                        errorEffect &&
                        `border-red-500 placeholder-red-500 text-red-500`
                      }`}
                      name="username"
                      onAnimationEnd={() => setErrorEffect(false)}
                      onChange={handleAuthFormChange}
                      onFocus={() => setErrorMessage("")}
                      placeholder="Username"
                      type="username"
                      value={username}
                    />
                    <input
                      className={`pr-12 mt-5 ${TEXT_FIELD} ${
                        errorEffect &&
                        `border-red-500 placeholder-red-500 text-red-500`
                      }`}
                      name="password"
                      onAnimationEnd={() => setErrorEffect(false)}
                      onChange={handleAuthFormChange}
                      onFocus={() => setErrorMessage("")}
                      placeholder="Password"
                      type="password"
                      value={password}
                    />

                    {/* Error message */}
                    {errorMessage ? (
                      <div className="mt-2 text-sm font-semibold text-red-500">
                        {errorMessage}
                      </div>
                    ) : null}

                    <div className="flex flex-col justify-center mt-6 space-y-6">
                      <button
                        className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                        type="submit"
                      >
                        {oki ? (
                          LOADING_ANIMATION()
                        ) : (
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faSignIn}
                            size={"lg"}
                          />
                        )}
                        {textChange}
                      </button>

                      <button className={`${SECONDARY_BUTTON}`} type={"button"}>
                        <Link to={"/forgot-password"}>
                          <h1 className="px-5 py-1">Forgot Password?</h1>
                        </Link>
                      </button>
                    </div>
                  </form>
                ) : count === 2 ? (
                  <form
                    className="relative mx-auto mt-6 mb-6 max-w-screen"
                    onSubmit={handle2FAFormSubmit}
                  >
                    {/*  Choice of identity */}
                    <div className="flex flex-col justify-center mt-6 space-y-6">
                      {id1 ? (
                        <li className={`list-none`}>
                          <input
                            checked={email === id1}
                            className={`sr-only peer`}
                            id="id1"
                            name="email"
                            onAnimationEnd={() => setErrorEffect(false)}
                            onChange={handleAuthFormChange}
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
                            <p className="truncate">Email {id1}</p>
                          </label>
                        </li>
                      ) : (
                        EMAIL_NOT_SET("Primary")
                      )}
                      {id2 ? (
                        <li className="list-none">
                          <input
                            checked={email === id2}
                            className="sr-only peer "
                            id="id2"
                            name="email"
                            onAnimationEnd={() => setErrorEffect(false)}
                            onChange={handleAuthFormChange}
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
                            <p className="truncate">Email {id2}</p>
                          </label>
                        </li>
                      ) : (
                        EMAIL_NOT_SET("Secondary")
                      )}
                      {id3 ? (
                        <li className="list-none">
                          <input
                            checked={email === id3}
                            className="sr-only peer "
                            id="id3"
                            name="email"
                            onAnimationEnd={() => setErrorEffect(false)}
                            onChange={handleAuthFormChange}
                            onFocus={() => setErrorMessage("")}
                            type="radio"
                            value={id3}
                          />
                          <label
                            className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                              errorEffect
                                ? `border-red-500 placeholder-red-500 text-red-500`
                                : PRIMARY_RADIO
                            } `}
                            htmlFor="id3"
                          >
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faEnvelope}
                              size={"lg"}
                            />
                            <p className="truncate">Email {id3}</p>
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
                        {oki ? LOADING_ANIMATION() : null}
                        {textChange}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <form className="relative mx-auto mt-6 mb-6 max-w-screen">
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffect &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="code"
                        onAnimationEnd={() => setErrorEffect(false)}
                        onChange={handleAuthFormChange}
                        onFocus={() => setErrorMessage("")}
                        placeholder="2FA Code"
                        type="text"
                        value={code}
                      />
                      {/* Error message */}
                      {errorMessage ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                          {errorMessage}
                        </div>
                      ) : null}
                      <div className="flex flex-col justify-center mt-6 space-y-6">
                        {code.length < 7 || code.length > 7 ? (
                          <button
                            className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
                              buttonDisabled &&
                              `opacity-50 cursor-not-allowed pointer-events-none`
                            }`}
                            name="resend"
                            onClick={handle2FAFormSubmit}
                            type="reset"
                          >
                            {oki ? (
                              LOADING_ANIMATION()
                            ) : (
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faRepeat}
                                size={"lg"}
                              />
                            )}
                            {textChange2}{" "}
                            {countDown !== 0 ? `(${countDown})` : null}
                          </button>
                        ) : (
                          <button
                            className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                            name="submit"
                            onClick={handle2FAVerifyFormSubmit}
                            type="submit"
                          >
                            {oki ? (
                              LOADING_ANIMATION()
                            ) : (
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faSignIn}
                                size={"lg"}
                              />
                            )}
                            {textChange}
                          </button>
                        )}
                      </div>
                    </form>
                    <button
                      className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
                        count === 1 ? "hidden" : ""
                      }`}
                      onClick={() => {
                        setCount(count - 1);
                        setAuthForm({
                          ...authForm,
                          textChange: "Verify email",
                        });
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
          </div>
        </div>
      </div>
    </div>
  );
}
