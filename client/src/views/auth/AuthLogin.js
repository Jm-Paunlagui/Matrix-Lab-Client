import "react-toastify/dist/ReactToastify.css";

import {
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
} from "../../assets/styles/input-types-styles";
import React, { useState } from "react";

import BackNavigation from "../../components/navbars/BackNavigation";
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { Link } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description User login form for the application
 */
export default function AuthLogin() {

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
          <div className="relative flex flex-col w-full min-w-0 break-words bg-white border-0 rounded-lg">
            <BackNavigation backTo={"/"} hasText={false} isSmall />
            <div className={"pr-6 pl-6 pb-6"}>
              <div className="flex items-center py-2 text-gray-800">
                <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                <h1 className="ml-3 font-extrabold tracking-widest text-md">
                  MATRIX LAB
                </h1>
              </div>
              <div className="flex-auto space-y-6">
                <h6 className="text-lg font-bold text-gray-500">
                  Sign in to your account
                </h6>
                <form className="relative mx-auto mt-4 space-y-6 max-w-screen">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-username"
                        type={'text'}
                        value={values.username}
                        onChange={handleChange('username')}
                        label="Username"
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                              {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                    />
                  </FormControl>

                  <div className="flex flex-col justify-center space-y-6">
                    <button type={"button"} className={`${SECONDARY_BUTTON}`}>
                      <Link to={"/forgot-password"}>
                        <h1 className="px-5 py-3">Forgot Password?</h1>
                      </Link>
                    </button>
                    <button
                      type={"button"}
                      className={`px-5 py-3 pl-4 ${PRIMARY_BUTTON}`}
                    >
                      <i
                        className={`fas fa-sign-in-alt ${ICON_PLACE_SELF_CENTER}`}
                      />
                      Sign in
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
