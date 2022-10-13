import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {faSignIn, faSpinner} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";
import SuccessAnimation from 'actually-accessible-react-success-animation';
import {Link} from "react-router-dom";

/**
 * @description Handles the forgot password request page
 */
export default function AuthForgotPasswordRequest() {
  const [resetForm, setResetForm] = useState({
    username: "",
    email: "",
    emailConfirmation: "",
    textChange: "Confirm Email",
  });

  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);

  const [errorEffect, setErrorEffect] = useState(false);
  const [error, setError] = useState("");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setResetForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [count, setCount] = React.useState(1);

  const { username, email, emailConfirmation, textChange } = resetForm;

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await httpClient.post("/check-email", { username });
      if (resp.statusText === "OK") {
        console.log(resp.data);
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
      setError(error.response.data.message);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({
      ...resetForm,
      textChange: "Sending",
    })
    try {
      const resp = await httpClient.post("/forgot-password", {
        email: email,
      })
      if (resp.statusText === "OK") {
        setOk(true);
      }
    } catch (error) {
      setErrorEffect(true);
      setError(error.response.data.message);
      setOki(false);
      setResetForm({
        ...resetForm,
        textChange: "Confirm Email",
      })
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
            <BackNavigation backTo={"/auth"} hasText={false} isSmall />
            {ok ? (
                <div className="bg-white py-12 rounded-lg shadow-lg">

                  <SuccessAnimation
                      text="Success!"
                      color="#5cb85c"
                  />
                      <div className="text-center text-gray-500 px-6 space-y-6">
                        <p className="text-lg">We&#39;ve sent you an email with a link to reset your password. Please check your inbox.</p>
                        <p className="text-lg">If you don&#39;t see it, check your spam folder.</p>
                        <div className="flex flex-col justify-center">
                          <button type={"button"} className={`${PRIMARY_BUTTON}`}>
                            <Link to={"/auth"}>
                              <h1 className="px-5 py-1">Done?
                                <FontAwesomeIcon
                                    icon={faSignIn}
                                    className={`ml-2 ${ICON_PLACE_SELF_CENTER}`}
                                /> Sign in</h1>
                            </Link>
                          </button>
                        </div>
                      </div>
                </div>

            ) : (
                <>
            <div className={"px-6 lg:px-28"}>

              <div className="flex items-center py-2 text-gray-800 justify-center">
                <img src={logo} alt="logo" className="w-12 h-12 -mt-12" />
              </div>
              <h1> Step {count} of 2</h1>
              <div className="flex-auto space-y-6 mb-24 -mt-14">
                <div className="mb-3 text-start">
                  <h6 className="text-lg xl:text-2xl font-bold text-gray-500 mt-16">
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
                    Please confirm your email address below. with the email address of <b>{emailConfirmation}</b>
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
                          onFocus={() => setError("")}
                      />
                      {/* Error message */}
                      {error ? (
                          <div className="text-red-500 text-sm font-semibold mt-2">
                            {error}
                          </div>
                      ) : null}
                      <button
                          className={`px-5 py-1 pl-4 w-full mt-6 ${PRIMARY_BUTTON} ${count === 2 ? "hidden" : ""}`}
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
                          onFocus={() => setError("") && setOki(false)}
                      />
                      {/* Error message */}
                      {error ? (
                          <div className="text-red-500 text-sm font-semibold mt-2">
                            {error}
                          </div>
                      ) : null}
                      <div className="flex flex-col justify-between space-y-6 mt-6">
                        <button
                            className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${count === 1 ? "hidden" : ""}`}
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
                          <svg className="w-5 h-5 mr-2 animate-spin ease-in-out">
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className={ICON_PLACE_SELF_CENTER}
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
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
