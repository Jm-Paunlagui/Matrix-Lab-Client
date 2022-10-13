import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faSignIn, faSpinner } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";
import PasswordChecklist from "react-password-checklist";
import { Link, useParams } from "react-router-dom";
import SuccessAnimation from "actually-accessible-react-success-animation";

/**
 * @description Handles the forgot password request page
 */
export default function AuthResetPassword() {
  const { token } = useParams();

  const [newPassword, setNewPassword] = React.useState({
    password: "",
    confirmPassword: "",
    textChange: "Reset Password",
  });

  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);
  const [errorEffect, setErrorEffect] = React.useState(false);
  const [error, setError] = React.useState("");

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const { password, confirmPassword, textChange } = newPassword;

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setNewPassword({
      ...newPassword,
      textChange: "Resetting your Password",
    });
    try {
      const resp = await httpClient.post(`/reset-password/${token}`, {
        password,
      });
      if (resp.statusText === "OK") {
        setOk(true);
      }
    } catch (error) {
      setErrorEffect(true);
      setError(error.response.data.message);
      setNewPassword({
        ...newPassword,
        textChange: "Reset Password",
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
              <div className="bg-white py-12 rounded-lg shadow-lg">
                <SuccessAnimation text="Success!" color="#5cb85c" />
                <div className="text-center text-gray-500 px-6 space-y-6">
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
              <>
                <div className={"px-6 lg:px-28"}>
                  <div className="flex items-center py-2 text-gray-800 justify-center">
                    <img src={logo} alt="logo" className="w-12 h-12 -mt-12" />
                  </div>
                  <div className="flex-auto space-y-6 mb-24 -mt-14">
                    <div className="mb-3 text-start">
                      <h6 className="text-lg xl:text-2xl font-bold text-gray-500 mt-16">
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
                          onFocus={() => setError("")}
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
                          onFocus={() => setError("")}
                        />
                      </div>
                      {/* Error message */}
                      {error ? (
                        <div className="text-red-500 text-sm font-semibold mt-2">
                          {error}
                        </div>
                      ) : null}
                      <div className="space-y-6 mt-6">
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
                          onChange={(isValid) => {}}
                        />
                        <div className="flex flex-col justify-center">
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
                      </div>
                    </form>
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
