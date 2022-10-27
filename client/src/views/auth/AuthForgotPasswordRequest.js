import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessAnimation from "actually-accessible-react-success-animation";

import logo from "../../assets/img/android-chrome-192x192.png";
import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
} from "../../assets/styles/input-types-styles";
import BackNavigation from "../../components/navbars/BackNavigation";
import httpClient from "../../http/httpClient";
import { maskEmail } from "../../helpers/Helper";
import { toast } from "react-toastify";
import { AssociatedEmails, SendToEmail, Username } from '../../forms/CredentialForms';

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
    id3: "",
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
    // reset the error message when the user starts typing and error effect set to false.
    setErrorEffect(false);
    setErrorMessage("");
  };
  /**
   * @description For step counter in the forgot password form.
   */

  const [count, setCount] = useState(1);
  /**
   * @description Destructs the state variables
   */

  const { username, email, confirm_email, id1, id2, id3, textChange } =
    resetForm; // Hide email address with mask

  /**
   * @description Handles the form submission and makes a POST request to the backend to check user email.
   * @param event
   * @returns {Promise<void>}
   */

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({ ...resetForm, textChange: "Verifying" });

    await httpClient
      .post("/user/check-email", {
        username,
      })
      .then((response) => {
        setResetForm({
          ...resetForm,
          id1: response.data.email[0],
          id2: response.data.email[1],
          id3: response.data.email[2],
          textChange: "Continue",
        });
        setCount(count + 1);
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setOki(false);
        setErrorMessage(error.response.data.message);
        setResetForm({ ...resetForm, textChange: "Next" });
      });
  };
  /**
   * @description To make a user choose, which email address to use. If the user has multiple email addresses.
   * @param event
   * @returns {Promise<void>}
   */

  const handleVerifyEmailSubmit = (event) => {
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
    await httpClient
      .post("/user/forgot-password", {
        email,
        confirm_email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "info" });
        setOk(true);
        setResetForm({ ...resetForm, textChange: "Success" });
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setResetForm({ ...resetForm, textChange: "Verify Email" });
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
                      Username(handleUsernameSubmit, handleFormChange, username, oki, errorEffect, errorMessage, count, textChange)
                  ) : count === 2 ? (
                      AssociatedEmails(handleVerifyEmailSubmit, id1, id2, id3, confirm_email, handleFormChange, oki, errorEffect, errorMessage, count, textChange)
                  ) : (
                      SendToEmail(handleEmailSubmit, email, handleFormChange, oki, errorEffect, errorMessage, count, textChange, setCount, setResetForm, resetForm, setErrorMessage)
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
