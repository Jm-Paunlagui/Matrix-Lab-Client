import React from "react";
import { loading_animation } from "../../assets/styles/loading_animation";

/**
 * @description Logout in the loading animation
 */
export default function AuthLogout() {
  return (
    <div className="fixed flex items-center w-full h-full min-h-screen font-Montserrat">
      <div className="container h-full mx-auto font-Montserrat">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
            <div className="flex flex-col justify-center">
              <div className={`px-5 py-1 pl-4 flex flex-row justify-center`}>
                {loading_animation()}
                <h6 className="font-bold text-gray-500 text-xl">
                  Logging out...
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
