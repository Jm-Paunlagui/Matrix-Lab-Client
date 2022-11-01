import {
  DANGER_BUTTON,
  ICON_PLACE_SELF_CENTER,
  LOADING_ANIMATION,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

import React, { useState } from "react";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {
  /**
   * @description Parses the user data from session storage
   */
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
    cancelforPersonalInfo: false,
    okforPersonalInfo: false,
    errorEffectforPersonalInfo: false,
    errorMessageforPersonalInfo: "",
    showButtonforPersonalInfo: true,
    textChangeforPersonalInfo: "Update",
    secondary_email: "",
    recovery_email: "",
    cancelforSecurityInfo: false,
    okforSecurityInfo: false,
    errorEffectforSecurityInfo: false,
    errorMessageforSecurityInfo: "",
    showButtonforSecurityInfo: true,
    textChangeforSecurityInfo: "Update",
    username: "",
    cancelforUsername: false,
    okforUsername: false,
    errorEffectforUsername: false,
    errorMessageforUsername: "",
    showButtonforUsername: true,
    textChangeforUsername: "Update",
    old_password: "",
    new_password: "",
    confirm_password: "",
    cancelforPassword: false,
    okforPassword: false,
    errorEffectforPassword: false,
    errorMessageforPassword: "",
    showButtonforPassword: true,
    textChangeforPassword: "Update",
  });

  const {
    email,
    first_name,
    last_name,
    cancelforPersonalInfo,
    okforPersonalInfo,
    errorEffectforPersonalInfo,
    errorMessageforPersonalInfo,
    showButtonforPersonalInfo,
    textChangeforPersonalInfo,
    secondary_email,
    recovery_email,
    cancelforSecurityInfo,
    okforSecurityInfo,
    errorEffectforSecurityInfo,
    errorMessageforSecurityInfo,
    showButtonforSecurityInfo,
    textChangeforSecurityInfo,
    username,
    cancelforUsername,
    okforUsername,
    errorEffectforUsername,
    errorMessageforUsername,
    showButtonforUsername,
    textChangeforUsername,
    old_password,
    new_password,
    confirm_password,
    cancelforPassword,
    okforPassword,
    errorEffectforPassword,
    errorMessageforPassword,
    showButtonforPassword,
    textChangeforPassword,
  } = profile;

  const handleChangeForPersonalInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPersonalInfo: false,
      errorMessageforPersonalInfo: "",
      showButtonforPersonalInfo: false,
    });
  };
  const handleChangeForSecurityInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforSecurityInfo: false,
      errorMessageforSecurityInfo: "",
      showButtonforSecurityInfo: false,
    });
  };
  const handleChangeForUsername = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforUsername: false,
      errorMessageforUsername: "",
      showButtonforUsername: false,
    });
  };
  const handleChangeForPassword = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPassword: false,
      errorMessageforPassword: "",
      showButtonforPassword: false,
    });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Account Management
          </h1>
          <h1 className="text-sm font-medium text-gray-500">
            @{user.username}
          </h1>
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
          <div
            className={`flex flex-col w-full mb-8 bg-white rounded outline outline-2 
            ${
              errorEffectforPersonalInfo ? `animate-wiggle` : "outline-gray-200"
            }`}
            onAnimationEnd={() =>
              setProfile({ ...profile, errorEffectforPersonalInfo: false })
            }
          >
            <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Personal Information
                </h1>
                <p className="mb-4 text-sm text-gray-500">
                  This information is private and only visible to you and your
                  organization. It will not be shared with anyone else.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form>
                  <div className="flex flex-col space-y-4" onBlur={() =>setProfile({
                    ...profile,
                    showButtonforPersonalInfo: true,
                  })}
                  >
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Email
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforPersonalInfo &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="email"
                        onChange={handleChangeForPersonalInfo("email")}
                        placeholder={user.email}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        First Name
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforPersonalInfo &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="first_name"
                        onChange={handleChangeForPersonalInfo("first_name")}
                        placeholder={user.first_name}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Last Name
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforPersonalInfo &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="last_name"
                        onChange={handleChangeForPersonalInfo("last_name")}
                        placeholder={user.last_name}
                        type="text"
                      />
                    </div>
                  </div>
                  {/* Error message */}
                  {errorMessageforPersonalInfo ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                      {errorMessageforPersonalInfo}
                    </div>
                  ) : null}
                  <div
                    className={`flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2
                        ${showButtonforPersonalInfo ? "hidden" : "block"}`}
                  >
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                      type="button"
                    >
                      {cancelforPersonalInfo ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faXmark}
                          size={"lg"}
                        />
                      )}
                      Cancel
                    </button>
                    <div className="p-1" />
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                      type="button"
                    >
                      {okforPersonalInfo ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faPenToSquare}
                          size={"lg"}
                        />
                      )}
                      {textChangeforPersonalInfo}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col w-full mb-8 bg-white rounded outline outline-2 
          ${
            errorEffectforSecurityInfo ? `animate-wiggle` : "outline-gray-200"
          }`}
            onAnimationEnd={() =>
              setProfile({ ...profile, errorEffectforSecurityInfo: false })
            }
          >
            <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Security and Verification
                </h1>
                <p className="mb-4 text-sm text-gray-500">
                  As of now, you can only prove your identity by providing your
                  email address. In the future, you will be able to provide
                  other ways to prove your identity.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form>
                  <div className="flex flex-col space-y-4" onBlur={() =>setProfile({
                    ...profile,
                    showButtonforSecurityInfo: true,
                  })}
                  >
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Secondary Email
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforSecurityInfo &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="secondary_email"
                        onChange={handleChangeForSecurityInfo(
                          "secondary_email",
                        )}
                        placeholder={user.secondary_email}
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Recovery Email
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforSecurityInfo &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="recovery_email"
                        onChange={handleChangeForSecurityInfo("recovery_email")}
                        placeholder={user.recovery_email}
                        type="email"
                      />
                    </div>
                  </div>
                  {/* Error message */}
                  {errorMessageforSecurityInfo ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                      {errorMessageforSecurityInfo}
                    </div>
                  ) : null}
                  <div
                    className={`flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2
                          ${showButtonforSecurityInfo ? "hidden" : "block"}`}
                  >
                    <button
                      className={`
                              px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                      type="button"
                    >
                      {cancelforSecurityInfo ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faXmark}
                          size={"lg"}
                        />
                      )}
                      Cancel
                    </button>
                    <div className="p-1" />
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                      type="button"
                    >
                      {okforSecurityInfo ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faPenToSquare}
                          size={"lg"}
                        />
                      )}
                      {textChangeforSecurityInfo}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col w-full mb-8 bg-white rounded outline outline-2
          ${
            errorEffectforUsername || errorEffectforPassword
              ? `animate-wiggle`
              : "outline-gray-200"
          }`}
            onAnimationEnd={() =>
              setProfile({
                ...profile,
                errorEffectforUsername: false,
                errorEffectforPassword: false,
              })
            }
          >
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Matrix Account Sign-In
                </h1>
                <p className="mb-4 text-sm text-gray-500">
                  We recommend that you periodically update your password to
                  keep your account secure and prevent unauthorized access to
                  your account.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form>
                  <div className="flex flex-col space-y-4" onBlur={() =>setProfile({
                    ...profile,
                    showButtonforUsername: true,
                  })}
                  >
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Username
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforUsername &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="username"
                        onChange={handleChangeForUsername("username")}
                        placeholder={user.username}
                        type="text"
                      />
                    </div>
                  </div>
                  {/* Error message */}
                  {errorMessageforUsername ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                      {errorMessageforUsername}
                    </div>
                  ) : null}
                  <div
                    className={`flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2
                          ${showButtonforUsername ? "hidden" : "block"}`}
                  >
                    <button
                      className={`
                        px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                      type="button"
                    >
                      {cancelforUsername ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faXmark}
                          size={"lg"}
                        />
                      )}
                      Cancel
                    </button>
                    <div className="p-1" />
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                      type="button"
                    >
                      {okforUsername ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faPenToSquare}
                          size={"lg"}
                        />
                      )}
                      {textChangeforUsername}
                    </button>
                  </div>
                </form>
                <form>
                  <div className="flex flex-col space-y-4"
                       onBlur={() =>setProfile({
                         ...profile,
                         showButtonforPassword: true,
                       })}
                  >
                    <h1 className="mb-4 text-xl font-bold text-gray-700">
                      Change Password
                    </h1>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Current Password
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforPassword &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="old_password"
                        onChange={handleChangeForPassword("old_password")}
                        placeholder="Current Password"
                        type="password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        New Password
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforPassword &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="new_password"
                        onChange={handleChangeForPassword("new_password")}
                        placeholder="New Password"
                        type="password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Confirm New Password
                      </h1>
                      <input
                        className={`${TEXT_FIELD} ${
                          errorEffectforPassword &&
                          `border-red-500 placeholder-red-500 text-red-500`
                        }`}
                        name="confirm_password"
                        onChange={handleChangeForPassword("confirm_password")}
                        placeholder="Confirm New Password"
                        type="password"
                      />
                    </div>
                  </div>
                  {/* Error message */}
                  {errorMessageforPassword ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                      {errorMessageforPassword}
                    </div>
                  ) : null}
                  <div
                    className={`flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2
                          ${showButtonforPassword ? "hidden" : "block"}`}
                  >
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                      type="button"
                    >
                      {cancelforPassword ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faXmark}
                          size={"lg"}
                        />
                      )}
                      Cancel
                    </button>
                    <div className="p-1" />
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                      type="button"
                    >
                      {okforPassword ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faPenToSquare}
                          size={"lg"}
                        />
                      )}
                      {textChangeforPassword}
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
