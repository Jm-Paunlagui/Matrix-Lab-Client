import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
} from "../../assets/styles/input-types-styles";

import BackNavigation from "../../components/navbars/BackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Handles the forgot password request page
 */
export default function AuthForgotPasswordRequest() {
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
          <div className="relative flex flex-col w-full min-w-0 break-words bg-white border-0 rounded-lg shadow-lg">
            <BackNavigation backTo={"/auth"} hasText={false} isSmall />
            <div className={"pr-6 pl-6 pb-6"}>
              <div className="flex items-center py-2 text-gray-800">
                <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                <h1 className="ml-3 font-extrabold tracking-widest text-md">
                  MATRIX LAB
                </h1>
              </div>
              <div className="flex-auto space-y-6">
                <div className="mb-3 text-start">
                  <h6 className="text-lg font-bold text-gray-500">
                    Forgot Password?
                  </h6>
                </div>
                <div className="mb-3 text-start">
                  <p className="text-gray-700">
                    Enter your email address below and we&apos;ll send you a new
                    password.
                  </p>
                </div>
                <form className="relative mx-auto space-y-6 max-w-screen">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      type={"text"}
                      value={values.email}
                      onChange={handleChange("email")}
                      label="Email"
                    />
                  </FormControl>
                  <button
                    className={`px-5 py-3 pl-4  ${PRIMARY_BUTTON}`}
                    type={"button"}
                  >
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      className={`${ICON_PLACE_SELF_CENTER}`}
                    />
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
