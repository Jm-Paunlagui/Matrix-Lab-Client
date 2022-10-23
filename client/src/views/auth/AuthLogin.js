import "react-toastify/dist/ReactToastify.css";

import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  PRIMARY_RADIO,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import React, { useEffect, useState } from "react";
import {
  faSignIn,
  faEnvelope,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";
import {loading_animation} from "../../assets/styles/loading_animation";

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
    code: "",
    buttonDisabled: true,
  });

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
    code,
    buttonDisabled
  } = authForm;

  /**
   * @description Handles the Error/Success animation and messages for the login form.
   */
  const [oki, setOki] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [countDown, setCountDown] = React.useState(0);

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

  // Count down function to reset the 2FA code after 30 seconds
  function countDownFunction() {
    setCountDown(countDown - 1);
  }

    // useEffect to reset the 2FA code after 30 seconds
    useEffect(() => {
        if (count >= 3){
          if (countDown > 0) {
            setTimeout(countDownFunction, 1000);
            setAuthForm({
                ...authForm,
                buttonDisabled: true,
            })
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
   * @description For step counter in the forgot password form.
   */
  const [count, setCount] = React.useState(1);

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
    try {
      const resp = await httpClient.post("/user/authenticate", {
        username,
        password,
      });
      if (resp.statusText === "OK") {
        setOki(true);
        setAuthForm({
          ...authForm,
          id1: resp.data.identity_one,
          id2: resp.data.identity_two,
          textChange: "Verify email",
        });
        setCount(count + 1);
        setOki(false);
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

  const handle2FAFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Sending Code",
    });
    try {
      const resp = await httpClient.post("/user/checkpoint-2fa", {
        email,
      });
      if (resp.statusText === "OK") {
        setOki(true);
        setCountDown(30);
        setCount(count + 1);
        setAuthForm({
          ...authForm,
          textChange: "Verify code",
          textChange2: "Resend code",
        });
        setOki(false);
      }
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
      setOki(false);
      setAuthForm({
        ...authForm,
        textChange: "Verify",
      });
    }
  };

  const handleResend2FAFormSubmit = async (event) => {
    event.preventDefault();
    await handle2FAFormSubmit(event);
  }

  const handle2FAVerifyFormSubmit = async (event) => {
        event.preventDefault();
        setOki(true);
        setAuthForm({
            ...authForm,
            textChange: "Verifying",
        });
        try {
            const resp = await httpClient.post("/user/verify-2fa", {
            code,
            });
            if (resp.statusText === "OK") {
            setOki(true);
            setAuthForm({
                ...authForm,
                textChange: "Success",
            });
            console.log(resp.data);
            window.location.href = resp.data.path;
            }
        } catch (error) {
            setErrorEffect(true);
            setErrorMessage(error.response.data.message);
            setOki(false);
            setAuthForm({
            ...authForm,
            textChange: "Verify",
            });
        }
    }


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
                  {count === 1
                    ? "Sign in to MATRIX LAB"
                    : count === 2
                    ? "Verify your identity"
                    : "Two-factor authentication"}
                </h6>
                <div className="mt-4 text-start">
                  {count === 1 ? null : (
                    <p className="text-gray-500">{authForm.username}</p>
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
                      type="username"
                      placeholder="Username"
                      value={username}
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
                      value={password}
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
                            loading_animation()
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
                ) : count === 2 ? (
                  <form
                    className="relative mx-auto mt-6 mb-6 max-w-screen"
                    onSubmit={handle2FAFormSubmit}
                  >
                    {/*  Choice of identity */}
                    <div className="flex flex-col justify-center mt-6 space-y-6">
                      {/*    if identity is null, dont show the option else show both*/}
                      {id1 ? (
                        <li className={`list-none`}>
                          <input
                            className={`sr-only peer`}
                            type="radio"
                            value={id1}
                            name="email"
                            id="id1"
                            checked={email === id1}
                            onChange={handleAuthFormChange}

                            onAnimationEnd={() => setErrorEffect(false)}
                            onFocus={() => setErrorMessage("")}
                          />
                          <label
                            className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                                errorEffect ?
                                `border-red-500 placeholder-red-500 text-red-500`
                                    : PRIMARY_RADIO
                            }`}
                            htmlFor="id1"
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              size={"lg"}
                              className={`${ICON_PLACE_SELF_CENTER}`}
                            />
                            <p className="truncate">Email {id1}</p>
                          </label>
                        </li>
                      ) : null}
                      {id2 ? (
                        <li className="list-none">
                          <input
                            className="sr-only peer "
                            type="radio"
                            value={id2}
                            name="email"
                            id="id2"
                            checked={email === id2}
                            onChange={handleAuthFormChange}

                            onAnimationEnd={() => setErrorEffect(false)}
                            onFocus={() => setErrorMessage("")}
                          />
                          <label
                            className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                                errorEffect ?
                                    `border-red-500 placeholder-red-500 text-red-500`
                                    : PRIMARY_RADIO
                            } `}
                            htmlFor="id2"
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              size={"lg"}
                              className={`${ICON_PLACE_SELF_CENTER}`}
                            />
                            <p className="truncate">Email {id2}</p>
                          </label>
                        </li>
                      ) : null}
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
                            loading_animation()
                        ) : null}
                        {textChange}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form className="relative mx-auto mt-6 mb-6 max-w-screen">
                    <input
                      className={`${TEXT_FIELD} ${
                        errorEffect &&
                        `border-red-500 placeholder-red-500 text-red-500`
                      }`}
                      type="text"
                      placeholder="2FA Code"
                      value={code}
                      name="code"
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
                      {code.length < 7 || code.length > 7 ? (
                          <button
                              type="reset"
                              name="resend"
                              onClick={handleResend2FAFormSubmit}
                              className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
                                  buttonDisabled &&
                                  `opacity-50 cursor-not-allowed pointer-events-none`
                              }`}
                          >
                            {oki ? (
                                loading_animation()
                            ) : (
                                <FontAwesomeIcon
                                    icon={faRepeat}
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                />
                            )}
                            {textChange2} {countDown !== 0 ? "("+countDown+")" : null}
                          </button>
                      ) : (
                          <button
                              type="submit"
                              name="submit"
                              onClick={handle2FAVerifyFormSubmit}
                              className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                          >
                            {oki ? (
                                loading_animation()
                            ) : (
                                <FontAwesomeIcon
                                    icon={faSignIn}
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                />
                            )}
                            {textChange}
                          </button>
                      )}

                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
