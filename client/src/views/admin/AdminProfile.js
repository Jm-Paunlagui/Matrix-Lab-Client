import React from "react";
import {
  DANGER_BUTTON,
  PRIMARY_BUTTON,
} from "../../assets/styles/input-types-styles";

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {
  return (
    <div className="px-6 bg-gray-100 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-6 py-8">
        <div className="flex flex-col items-center justify-center w-full h-32 md:h-48 bg-white rounded outline outline-2 outline-gray-200 p-4">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Account Management
          </h1>
          <h1 className="text-sm font-medium text-gray-500">@johnpaunlagui</h1>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col mb-8 w-full bg-white rounded outline outline-2 outline-gray-200">
            <div className="flex flex-col w-full h-full rounded grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="text-xl font-bold text-gray-700 mb-4">
                  Matrix ID
                </h1>
                <p className="mb-4 text-sm">
                  This is your unique identifier for your account. It is used to
                  identify you on the platform.
                </p>
              </div>
              <div className="flex flex-col w-full h-full p-8 pb-8 space-y-4 col-span-3">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Matrix ID
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="MATRIX ID"
                      />
                    </div>
                  </div>

                  {/* Save changes or Cancel */}
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
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-8 w-full bg-white rounded outline outline-2 outline-gray-200">
            <div className="flex flex-col w-full h-full rounded grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="text-xl font-bold text-gray-700 mb-4">
                  Personal Information
                </h1>
                <p className="mb-4 text-sm">
                  This information is private and only visible to you and your
                  organization. It will not be shared with anyone else.
                </p>
              </div>
              <div className="flex flex-col w-full h-full p-8 pb-8 space-y-4 col-span-3">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Email
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        First Name
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Last Name
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Last Name"
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
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-8 w-full bg-white rounded outline outline-2 outline-gray-200">
            <div className="flex flex-col w-full h-full rounded grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="text-xl font-bold text-gray-700 mb-4">
                  Matrix Account Sign-In
                </h1>
                <p className="mb-4 text-sm">
                  We recommend that you periodically update your password to
                  keep your account secure and prevent unauthorized access to
                  your account.
                </p>
              </div>
              <div className="flex flex-col w-full h-full p-8 pb-8 space-y-4 col-span-3">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Username
                      </h1>
                      <input
                        type="text"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Username"
                      />
                    </div>
                    <h1 className="text-xl font-bold text-gray-700 mb-4">
                      Change Password
                    </h1>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Current Password
                      </h1>
                      <input
                        type="password"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Current Password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        New Password
                      </h1>
                      <input
                        type="password"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Confirm New Password
                      </h1>
                      <input
                        type="password"
                        className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                        placeholder="Confirm New Password"
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
                      Save Changes
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
