import Button from "../../components/buttons/button.component";
import React from "react";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Handles the forgot password request page
 */
function ForgotPasswordReq() {
  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
          <div className="relative flex flex-col w-full min-w-0 break-words bg-white border-0 rounded-lg shadow-lg p-6">
            <Button
              isButton={false}
              title="Back"
              icon="fas fa-arrow-left pr-2"
              moreStyle="w-1/2 font-semibold tracking-wide text-teal-500 hover:text-indigo-500 border-2 text-left"
              href="/auth"
            />

            <div className="flex items-center py-2 text-gray-800">
              <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
              <h1 className="ml-3 font-extrabold tracking-widest text-md">
                MATRIX LAB
              </h1>
            </div>

            <div className="flex-auto">
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
              <form className="relative mx-auto mt-6 max-w-screen">
                <input
                  className="w-full p-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                />
                <Button
                  title="Reset Password"
                  icon="fas fa-rotate-right pr-2"
                  moreStyle="w-full py-4 pl-4 mt-6 font-semibold tracking-wide text-white bg-indigo-500 hover:bg-white hover:text-indigo-500 border-2 hover:border-indigo-500 "
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordReq;
