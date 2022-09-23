import React from "react";
import {
  DANGER_BUTTON,
  PRIMARY_BUTTON,
} from "../../assets/styles/input-types-styles";

/**
 * @description Handles the admin prediction
 */
export default function AdminPrediction() {
  return (
    <div className="px-6 bg-gray-100 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-6 py-8">
        <div className="flex flex-col items-center justify-center w-full h-32 md:h-48 bg-white rounded outline outline-2 outline-gray-200 p-4">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Sentiment Analysis
          </h1>
          <h1 className="text-sm font-medium text-gray-500">@johnpaunlagui</h1>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col mb-8 w-full bg-white rounded outline outline-2 outline-gray-200">
            <div className="flex flex-col w-full h-full rounded grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="text-xl font-bold text-gray-700 mb-4">
                  from Database
                </h1>
                <p className="mb-4 text-sm">
                  All of the entries in your database will be analyzed and the
                  results will be displayed here. This will take a while.
                </p>
              </div>
              <div className="flex flex-col w-full h-full p-8 pb-8 space-y-4 col-span-3">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-xl font-bold text-gray-700 mb-4">
                        DB Credentials
                      </h1>
                      <h1 className="text-base font-medium text-gray-500">
                        Host
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Host"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        User
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="User"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Password
                      </h1>
                      <input
                        type="password"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Database
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Database"
                      />
                    </div>
                    <h1 className="text-xl font-bold text-gray-700 mb-4">
                      Column Selection
                    </h1>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Table Name
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Table"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Data Source
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Data Source"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Evaluatee
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Evaluatee"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Department
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Department"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Course Code
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Course Code"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        School Year and Semester
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="School Year and Semester"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row w-full justify-end lg:space-x-2 mt-8">
                    <button
                      type="button"
                      className={`px-8 py-1 ${DANGER_BUTTON}`}
                    >
                      Cancel
                    </button>
                    <div className="p-1" />
                    <button
                      type="button"
                      className={`px-8 py-1 ${PRIMARY_BUTTON}`}
                    >
                      Analyze and Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mb-16" />
        </div>
      </div>
    </div>
  );
}
