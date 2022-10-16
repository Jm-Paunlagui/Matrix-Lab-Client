import {
  DANGER_BUTTON,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

import React from "react";
import {useParams} from "react-router-dom";

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {

  /**
   * @description Gets username from the url
   */
  const { username } = useParams()

  /**
   * @description Parses the user data from session storage
   */
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Account Management
          </h1>
          <h1 className="text-sm font-medium text-gray-500">@{user.username}</h1>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col w-full mb-8 bg-white rounded outline outline-2 outline-gray-200">
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Account Type
                </h1>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <div className="flex flex-col w-full space-y-2">
                  This account is an {user.role} account. This account has the
                  highest privileges in the system.
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-8 bg-white rounded outline outline-2 outline-gray-200">
            <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Personal Information
                </h1>
                <p className="mb-4 text-sm">
                  This information is private and only visible to you and your
                  organization. It will not be shared with anyone else.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Email
                      </h1>
                      <input
                        type="text"
                        className={TEXT_FIELD}
                        placeholder={user.email}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        First Name
                      </h1>
                      <input
                        type="text"
                        className={TEXT_FIELD}
                        placeholder={user.first_name}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Last Name
                      </h1>
                      <input
                        type="text"
                        className={TEXT_FIELD}
                        placeholder={user.last_name}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
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
          <div className="flex flex-col w-full mb-8 bg-white rounded outline outline-2 outline-gray-200">
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Matrix Account Sign-In
                </h1>
                <p className="mb-4 text-sm">
                  We recommend that you periodically update your password to
                  keep your account secure and prevent unauthorized access to
                  your account.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Username
                      </h1>
                      <input
                        type="text"
                        className={TEXT_FIELD}
                        placeholder={user.username}
                      />
                    </div>
                    <h1 className="mb-4 text-xl font-bold text-gray-700">
                      Change Password
                    </h1>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Current Password
                      </h1>
                      <input
                        type="password"
                        className={TEXT_FIELD}
                        placeholder="Current Password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        New Password
                      </h1>
                      <input
                        type="password"
                        className={TEXT_FIELD}
                        placeholder="New Password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Confirm New Password
                      </h1>
                      <input
                        type="password"
                        className={TEXT_FIELD}
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
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
        </div>
      </div>
    </div>
  );
}
