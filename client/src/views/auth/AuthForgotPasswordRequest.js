import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../http/httpClient";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Handles the forgot password request page
 */
export default function AuthForgotPasswordRequest() {

  const [email, setEmail] = React.useState("");

  const [errorEffect, setErrorEffect] = React.useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await httpClient.post("/forgot-password", { email });
            if (resp.statusText === "OK") {
                console.log(resp);
            }
        } catch (error) {
            setErrorEffect(true);
            console.log(error);
        }
    }

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
          <div className={`relative flex flex-col w-full min-w-0 break-words bg-white border rounded-lg shadow-lg
                          ${errorEffect && `animate-wiggle`}`}
              onAnimationEnd={() => setErrorEffect(false)}
          >
            <BackNavigation backTo={"/auth"} hasText={false} isSmall />
            <div className={"px-6 lg:px-28"}>
              <div className="flex items-center py-2 text-gray-800 justify-center">
                <img src={logo} alt="logo" className="w-12 h-12 -mt-12" />
              </div>
              <div className="flex-auto space-y-6 mb-24 -mt-14">
                <div className="mb-3 text-start">
                  <h6 className="text-lg xl:text-2xl font-bold text-gray-500 mt-16">
                    Forgot Password?
                  </h6>
                </div>
                <div className="mb-3 text-start">
                  <p className="text-gray-700">
                    Enter your email address below and we&apos;ll send you a new
                    password.
                  </p>
                </div>
                <form className="relative mx-auto space-y-6 max-w-screen"
                        onSubmit={handleEmailSubmit}
                >
                  <input
                    className={`${TEXT_FIELD} ${errorEffect && `border-red-500 placeholder-red-500 text-red-500`}`}
                    type="email"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={handleEmailChange}
                    onAnimationEnd={() => setErrorEffect(false)}
                  />
                    <div className="flex flex-col justify-center">
                  <button
                    className={`px-5 py-1 pl-4 ${PRIMARY_BUTTON}`}
                    type="submit"
                  >
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      className={ICON_PLACE_SELF_CENTER}
                    />
                      Reset Password
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
