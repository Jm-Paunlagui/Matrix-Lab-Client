import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordChecklist from "react-password-checklist";
import SuccessAnimation from "actually-accessible-react-success-animation";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Handles the forgot password request page
 */
export default function AuthResetPassword() {
  /**
   * @description Gets the token from the url
   */
  const { token } = useParams();

  /**
   * @description State variables for the reset password form.
   */
  const [newPassword, setNewPassword] = React.useState({
    password: "",
    confirmPassword: "",
    textChange: "Reset Password",
    buttonDisabled: true,
  });

  /**
   * @description Handles the Error/Success animation and messages for the reset password form.
   */
  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);
  const [errorEffect, setErrorEffect] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  /**
   * @description Handles the change of the input fields
   * @param event
   */
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  /**
   * @description Destructs the state variables
   */
  const { password, confirmPassword, textChange, buttonDisabled } = newPassword;

  /**
   * @description Handles the form submission and makes a POST request to the backend to reset the password.
   * @param event
   * @returns {Promise<void>}
   */
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setNewPassword({
      ...newPassword,
      textChange: "Resetting your Password",
      buttonDisabled: true,
    });
    try {
      const resp = await httpClient.post(`/user/reset-password/${token}`, {
        password,
      });
      if (resp.statusText === "OK") {
        setOk(true);
      }
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
      setNewPassword({
        ...newPassword,
        textChange: "Reset Password",
        buttonDisabled: true,
      });
      setOki(false);
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
                    Your password has been reset successfully. You can now login
                    with your new password.
                  </p>
                  <div className="flex flex-col justify-center">
                    <button type={"button"} className={`${PRIMARY_BUTTON}`}>
                      <Link to={"/auth"}>
                        <h1 className="px-5 py-1">
                          Proceed to
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
                <div className="flex-auto mb-24 space-y-6 -mt-14">
                  <div className="mb-3 text-start">
                    <h6 className="mt-16 text-lg font-bold text-gray-500 xl:text-2xl">
                      Reset your password
                    </h6>
                  </div>

                  <form
                    className="relative mx-auto max-w-screen"
                    onSubmit={handlePasswordSubmit}
                  >
                    <div className="space-y-6">
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffect &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        type="password"
                        placeholder="New password"
                        value={password}
                        name="password"
                        onChange={handlePasswordChange}
                        onAnimationEnd={() => setErrorEffect(false)}
                        onFocus={() => setErrorMessage("")}
                      />
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffect &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={handlePasswordChange}
                        onAnimationEnd={() => setErrorEffect(false)}
                        onFocus={() => setErrorMessage("")}
                      />
                    </div>
                    {/* Error message */}
                    {errorMessage ? (
                      <div className="mt-2 text-sm font-semibold text-red-500">
                        {errorMessage}
                      </div>
                    ) : null}
                    <div className="mt-6 space-y-6">
                      <PasswordChecklist
                        className="text-sm text-gray-500"
                        iconSize={8}
                        rules={[
                          "minLength",
                          "specialChar",
                          "number",
                          "capital",
                          "match",
                        ]}
                        minLength={8}
                        value={password}
                        valueAgain={confirmPassword}
                        onChange={(isValid) => {
                          setNewPassword({
                            ...newPassword,
                            buttonDisabled: !isValid,
                          });
                        }}
                      />
                      <div className="flex flex-col justify-center">
                        <button
                          type="submit"
                          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
                            buttonDisabled &&
                            `opacity-50 cursor-not-allowed pointer-events-none`
                          }`}
                          disabled={buttonDisabled}
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
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
