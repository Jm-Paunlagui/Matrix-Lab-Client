import React from "react";

import { LOADING_ANIMATION } from "../../assets/styles/styled-components";

/**
 * @description Logout in the loading animation
 */
export default function LoadingPage() {
  return (
    <div className="flex items-center mx-auto w-full h-96">
      <div className="h-full mx-auto font-Montserrat">
        <div className="w-full flex items-center content-center justify-center h-full">
          <div className="flex flex-col justify-center animate-pulse">
            <div className={`px-5 py-1 pl-4 flex flex-row justify-center`}>
              {LOADING_ANIMATION()}
              {/* Animated text */}
              <h6 className="text-xl font-bold text-blue-500">Getting data</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
