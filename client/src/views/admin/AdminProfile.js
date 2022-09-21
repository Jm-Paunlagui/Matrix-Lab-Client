import React from "react";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";

import OutlinedInput from "@mui/material/OutlinedInput";

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {
  return (
    <div className="px-6 bg-gray-100">
      <h1 className="py-4 mb-4 text-xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 xl:text-3xl">
        Profile
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center w-full h-64 bg-white rounded outline outline-2 outline-gray-200">
          <img
            className="w-32 h-32 rounded-full"
            src="https://s.gravatar.com/avatar/24dd27ffab5c8b19a4414f8ab6217fae?s=600"
            alt="profile"
          />
          <h1 className="mt-2 text-xl font-bold text-gray-700">
            John Moises Paunlagui
          </h1>
          <h1 className="text-sm font-medium text-gray-500">@johnpaunlagui</h1>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col w-full bg-white rounded outline outline-2 outline-gray-200">
            <div className="flex flex-col w-full h-full rounded">
              <h1 className="mb-4 text-xl font-bold text-gray-700 bg-indigo-50 p-4">
                User Credentials
              </h1>
              <div className="flex flex-col w-full h-full space-y-4 px-4 pb-8">
                <form>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">
                      Username
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      type={"text"}
                      label="Username"
                    />
                  </FormControl>
                </form>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">
                    Username
                  </h1>
                  <input
                    type="text"
                    className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                    placeholder="Username"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">Email</h1>
                  <input
                    type="text"
                    className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">
                    Password
                  </h1>
                  <input
                    type="password"
                    className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">
                    Confirm Password
                  </h1>
                  <input
                    type="password"
                    className="px-4 py-2 text-gray-700 rounded-lg outline outline-1 outline-gray-200"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Account Settings */}
          <div className="flex flex-col w-full p-4 rounded">
            <div className="flex flex-col w-full h-full p-4 bg-white rounded-b-lg">
              <h1 className="mb-4 text-xl font-bold text-gray-700">
                Account Settings
              </h1>
              <div className="flex flex-col w-full h-full space-y-4">
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">
                    First Name
                  </h1>
                  <input
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                    placeholder="First Name"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">
                    Last Name
                  </h1>
                  <input
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-sm font-medium text-gray-500">
                    Phone Number
                  </h1>
                  <input
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Save Changes */}
          <div className="flex flex-col w-full p-4 rounded">
            <div className="flex flex-col w-full h-full p-4 bg-white rounded-b-lg">
              <button className="mb-4 text-xl font-bold text-gray-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
