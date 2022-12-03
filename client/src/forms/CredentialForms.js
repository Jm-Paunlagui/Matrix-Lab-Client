import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  faCircleCheck,
  faCaretRight,
  faEnvelope,
  faForward,
  faRepeat,
  faSignIn,
  faPenToSquare,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  ACCENT_BUTTON,
  EMAIL_NOT_SET,
  ICON_PLACE_SELF_CENTER,
  PRIMARY_BUTTON,
  PRIMARY_RADIO,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../assets/styles/styled-components";
import { maskEmail, emailRegex } from "../helpers/Helper";
import PasswordChecklist from "react-password-checklist";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { LoadingAnimation } from "../components/loading/LoadingPage";
import PropTypes from "prop-types";

/**
 * @description User login form for the application
 * @param errorEffect
 * @param errorMessage
 * @param handleAuthFormChange
 * @param handleAuthFormSubmit
 * @param oki
 * @param password
 * @param textChange
 * @param username
 * @constructor
 */
export function UsernamePassword({
  errorEffect,
  errorMessage,
  handleAuthFormChange,
  handleAuthFormSubmit,
  oki,
  password,
  textChange,
  username,
}) {
  UsernamePassword.propTypes = {
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handleAuthFormChange: PropTypes.func,
    handleAuthFormSubmit: PropTypes.func,
    oki: PropTypes.bool,
    password: PropTypes.string,
    textChange: PropTypes.string,
    username: PropTypes.string,
  };
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handleAuthFormSubmit}
    >
      <input
        className={`${TEXT_FIELD} ${
          errorEffect && `border-red-500 placeholder-red-500 text-red-500`
        }`}
        name="username"
        onChange={handleAuthFormChange}
        placeholder="Username"
        type="username"
        value={username}
      />
      <input
        className={`pr-12 mt-5 ${TEXT_FIELD} ${
          errorEffect && `border-red-500 placeholder-red-500 text-red-500`
        }`}
        name="password"
        onChange={handleAuthFormChange}
        placeholder="Password"
        type="password"
        value={password}
      />

      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}

      <div className="flex flex-col justify-center mt-6 space-y-6">
        <button
          className={`px-5 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
          type="submit"
        >
          {oki ? (
            <LoadingAnimation moreClasses="text-teal-600" />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faSignIn}
              size={"lg"}
            />
          )}
          {textChange}
        </button>

        <button className={`${SECONDARY_BUTTON}`} type={"button"}>
          <Link to={"/forgot-password"}>
            <h1 className="px-5 py-1">Forgot Password?</h1>
          </Link>
        </button>
      </div>
    </form>
  );
}

/**
 * @description User login form for the application
 * @param email
 * @param errorEffect
 * @param errorMessage
 * @param handle2FAFormSubmit
 * @param handleAuthFormChange
 * @param id1
 * @param id2
 * @param id3
 * @param oki
 * @param textChange
 * @constructor
 */
export function TFAbyEmail({
  email,
  errorEffect,
  errorMessage,
  handle2FAFormSubmit,
  handleAuthFormChange,
  id1,
  id2,
  id3,
  oki,
  textChange,
}) {
  TFAbyEmail.propTypes = {
    email: PropTypes.string,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handle2FAFormSubmit: PropTypes.func,
    handleAuthFormChange: PropTypes.func,
    id1: PropTypes.string,
    id2: PropTypes.string,
    id3: PropTypes.string,
    oki: PropTypes.bool,
    textChange: PropTypes.string,
  };
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handle2FAFormSubmit}
    >
      {/*  Choice of identity */}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        {emailRegex.test(id1) ? (
          <li className={`list-none`}>
            <input
              checked={email === id1}
              className={`sr-only peer`}
              id="id1"
              name="email"
              onChange={handleAuthFormChange}
              type="radio"
              value={id1}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id1"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              Email {id1}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Primary")
        )}
        {emailRegex.test(id2) ? (
          <li className="list-none">
            <input
              checked={email === id2}
              className="sr-only peer "
              id="id2"
              name="email"
              onChange={handleAuthFormChange}
              type="radio"
              value={id2}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id2"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              Email {id2}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Secondary")
        )}
        {emailRegex.test(id3) ? (
          <li className="list-none">
            <input
              checked={email === id3}
              className="sr-only peer "
              id="id3"
              name="email"
              onChange={handleAuthFormChange}
              type="radio"
              value={id3}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id3"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              Email {id3}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Recovery")
        )}
      </div>
      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex flex-col justify-between mt-6 space-y-6">
        <button
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
          type="submit"
        >
          {oki ? <LoadingAnimation moreClasses="text-teal-600" /> : null}
          {textChange}
        </button>
      </div>
    </form>
  );
}

/**
 * @description User login form for the application
 * @param authForm
 * @param buttonDisabled
 * @param code
 * @param count
 * @param countDown
 * @param errorEffect
 * @param errorMessage
 * @param handle2FAFormSubmit
 * @param handle2FAVerifyFormSubmit
 * @param handleAuthFormChange
 * @param oki
 * @param setAuthForm
 * @param setCount
 * @param setErrorMessage
 * @param textChange
 * @param textChange2
 * @param setCountDown
 * @constructor
 */
export function VerifyTFA({
  authForm,
  buttonDisabled,
  code,
  count,
  countDown,
  errorEffect,
  errorMessage,
  handle2FAFormSubmit,
  handle2FAVerifyFormSubmit,
  handleAuthFormChange,
  oki,
  setAuthForm,
  setCount,
  setErrorMessage,
  textChange,
  textChange2,
  setCountDown,
}) {
  VerifyTFA.propTypes = {
    authForm: PropTypes.object,
    buttonDisabled: PropTypes.bool,
    code: PropTypes.string,
    count: PropTypes.number,
    countDown: PropTypes.number,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handle2FAFormSubmit: PropTypes.func,
    handle2FAVerifyFormSubmit: PropTypes.func,
    handleAuthFormChange: PropTypes.func,
    oki: PropTypes.bool,
    setAuthForm: PropTypes.func,
    setCount: PropTypes.func,
    setErrorMessage: PropTypes.func,
    textChange: PropTypes.string,
    textChange2: PropTypes.string,
    setCountDown: PropTypes.func,
  };
  return (
    <>
      <form className="relative mx-auto mt-6 mb-6 max-w-screen">
        <input
          className={`${TEXT_FIELD} ${
            errorEffect && `border-red-500 placeholder-red-500 text-red-500`
          }`}
          name="code"
          onChange={handleAuthFormChange}
          placeholder="2FA Code"
          type="text"
          value={code}
        />
        {/* Error message */}
        {errorMessage ? (
          <div className="mt-2 text-sm font-semibold text-red-500">
            {errorMessage}
          </div>
        ) : null}
        <div className="flex flex-col justify-center mt-6 space-y-6">
          {code.length < 7 || code.length > 7 ? (
            <button
              className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
                buttonDisabled &&
                `opacity-50 cursor-not-allowed pointer-events-none`
              }`}
              name="resend"
              onClick={function (event) {
                handle2FAFormSubmit(event) && setCountDown(0);
              }}
              type="reset"
            >
              {oki ? (
                <LoadingAnimation moreClasses="text-teal-600" />
              ) : (
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faRepeat}
                  size={"lg"}
                />
              )}
              {textChange2} {countDown !== 0 ? `(${countDown})` : null}
            </button>
          ) : (
            <button
              className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
              name="submit"
              onClick={handle2FAVerifyFormSubmit}
              type="submit"
            >
              {oki ? (
                <LoadingAnimation moreClasses="text-teal-600" />
              ) : (
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faSignIn}
                  size={"lg"}
                />
              )}
              {textChange}
            </button>
          )}
        </div>
      </form>
      <button
        className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
          count === 1 ? "hidden" : ""
        }`}
        onClick={() => {
          setCount(count - 1);
          setAuthForm({
            ...authForm,
            code: "",
            textChange: "Verify email",
          });
          setErrorMessage("");
        }}
        type="button"
      >
        Previous
      </button>
    </>
  );
}

/**
 * @description Checking username associated with the email.
 * @param count
 * @param errorEffect
 * @param errorMessage
 * @param handleFormChange
 * @param handleUsernameSubmit
 * @param oki
 * @param textChange
 * @param username
 * @constructor
 */
export function Username(
  count,
  errorEffect,
  errorMessage,
  handleFormChange,
  handleUsernameSubmit,
  oki,
  textChange,
  username,
) {
  return (
    <form
      className="relative mx-auto max-w-screen"
      onSubmit={handleUsernameSubmit}
    >
      <input
        className={`${TEXT_FIELD} ${
          errorEffect && `border-red-500 placeholder-red-500 text-red-500`
        }`}
        name="username"
        onChange={handleFormChange}
        placeholder="username"
        type="username"
        value={username}
      />
      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        <button
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
            count === 2 ? "hidden" : ""
          }`}
          type="submit"
        >
          {oki ? (
            <LoadingAnimation moreClasses="text-teal-600" />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faCaretRight}
              size={"lg"}
            />
          )}
          {textChange}
        </button>
      </div>
    </form>
  );
}

/**
 * @description Users associated with the email address will be displayed, and the user will select an email address.
 * @param confirm_email
 * @param errorEffect
 * @param errorMessage
 * @param handleFormChange
 * @param handleVerifyEmailSubmit
 * @param id1
 * @param id2
 * @param id3
 * @param oki
 * @param textChange
 * @constructor
 */
export function AssociatedEmails(
  confirm_email,
  errorEffect,
  errorMessage,
  handleFormChange,
  handleVerifyEmailSubmit,
  id1,
  id2,
  id3,
  oki,
  textChange,
) {
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handleVerifyEmailSubmit}
    >
      {/*  Choice of identity */}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        {emailRegex.test(id1) ? (
          <li className={`list-none`}>
            <input
              checked={confirm_email === id1}
              className={`sr-only peer`}
              id="id1"
              name="confirm_email"
              onChange={handleFormChange}
              type="radio"
              value={id1}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id1"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              Email {maskEmail(id1)}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Primary")
        )}
        {emailRegex.test(id2) ? (
          <li className="list-none">
            <input
              checked={confirm_email === id2}
              className="sr-only peer "
              id="id2"
              name="confirm_email"
              onChange={handleFormChange}
              type="radio"
              value={id2}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id2"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              Email {maskEmail(id2)}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Secondary")
        )}
        {emailRegex.test(id3) ? (
          <li className="list-none">
            <input
              checked={confirm_email === id3}
              className="sr-only peer "
              id="id3"
              name="confirm_email"
              onChange={handleFormChange}
              type="radio"
              value={id3}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id3"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              Email {maskEmail(id3)}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Recovery")
        )}
      </div>
      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex flex-col justify-between mt-6 space-y-6">
        <button
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
          type="submit"
        >
          {oki ? (
            <LoadingAnimation moreClasses="text-teal-600" />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faForward}
              size={"lg"}
            />
          )}
          {textChange}
        </button>
      </div>
    </form>
  );
}

/**
 * @description Confirmation of the email address selected by the user.
 * @param count
 * @param email
 * @param errorEffect
 * @param errorMessage
 * @param handleEmailSubmit
 * @param handleFormChange
 * @param oki
 * @param resetForm
 * @param setCount
 * @param setErrorMessage
 * @param setResetForm
 * @param textChange
 * @constructor
 */
export function SendToEmail(
  count,
  email,
  errorEffect,
  errorMessage,
  handleEmailSubmit,
  handleFormChange,
  oki,
  resetForm,
  setCount,
  setErrorMessage,
  setResetForm,
  textChange,
) {
  return (
    <>
      <form
        className="relative mx-auto max-w-screen"
        onSubmit={handleEmailSubmit}
      >
        <input
          className={`${TEXT_FIELD} ${
            errorEffect && `border-red-500 placeholder-red-500 text-red-500`
          }`}
          name="email"
          onChange={handleFormChange}
          placeholder="Email"
          type="email"
          value={email}
        />
        {/* Error message */}
        {errorMessage ? (
          <div className="mt-2 text-sm font-semibold text-red-500">
            {errorMessage}
          </div>
        ) : null}
        <div className="flex flex-col justify-between mt-6 space-y-6">
          <button
            className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
            type="submit"
          >
            {oki ? (
              <LoadingAnimation moreClasses="text-teal-600" />
            ) : (
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCircleCheck}
                size={"lg"}
              />
            )}
            {textChange}
          </button>
        </div>
      </form>
      <button
        className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
          count === 1 ? "hidden" : ""
        }`}
        disabled={count > 3}
        onClick={() => {
          setCount(count - 1);
          setResetForm({ ...resetForm, email: "", textChange: "Next" });
          setErrorMessage("");
        }}
        type="button"
      >
        Previous
      </button>
    </>
  );
}

/**
 * @description User account type description.
 * @param role
 * @constructor
 */
export function AccountType(role) {
  return (
    <div className="flex flex-col w-full mb-8 bg-white rounded outline outline-2 outline-gray-200">
      <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
        <div className="col-span-2 p-8 bg-gray-50">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Account Type</h1>
        </div>
        <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
          {role === "admin" ? (
            <div className="flex flex-col w-full space-y-2">
              This account is an {role} account. This account has the highest
              privileges in the system. This account can create, edit, and
              delete other accounts.
            </div>
          ) : (
            <div className="flex flex-col w-full space-y-2">
              This account is a {role} account. This account has the lowest
              privileges in the system. This account can only view and edit
              their own account.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * @description Personal information form.
 * @param email
 * @param errorEffectforPersonalInfo
 * @param errorMessageforPersonalInfo
 * @param full_name
 * @param handleChangeForPersonalInfo
 * @param handleUpdatePersonalInfo
 * @param okforPersonalInfo
 * @param profile
 * @param setProfile
 * @param showButtonforPersonalInfo
 * @param textChangeforPersonalInfo
 * @constructor
 */
export function PersonalInformation(
  email,
  errorEffectforPersonalInfo,
  errorMessageforPersonalInfo,
  full_name,
  handleChangeForPersonalInfo,
  handleUpdatePersonalInfo,
  okforPersonalInfo,
  profile,
  setProfile,
  showButtonforPersonalInfo,
  textChangeforPersonalInfo,
) {
  return (
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
          <form onSubmit={handleUpdatePersonalInfo}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col w-full space-y-2">
                <h1 className="text-base font-medium text-gray-500">Email</h1>
                <input
                  className={`${TEXT_FIELD} ${
                    errorEffectforPersonalInfo &&
                    `border-red-500 placeholder-red-500 text-red-500`
                  }`}
                  name="email"
                  onChange={handleChangeForPersonalInfo("email")}
                  placeholder="Email"
                  type="text"
                  value={email}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <h1 className="text-base font-medium text-gray-500">
                  Full Name
                </h1>
                <input
                  className={`${TEXT_FIELD} ${
                    errorEffectforPersonalInfo &&
                    `border-red-500 placeholder-red-500 text-red-500`
                  }`}
                  name="full_name"
                  onChange={handleChangeForPersonalInfo("full_name")}
                  placeholder="Full Name"
                  type="text"
                  value={full_name}
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
                className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                type="submit"
              >
                {okforPersonalInfo ? (
                  <LoadingAnimation moreClasses="text-teal-600" />
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
  );
}

/**
 * @description Security Information form.
 * @param errorEffectforSecurityInfo
 * @param errorMessageforSecurityInfo
 * @param handleChangeForSecurityInfo
 * @param handleUpdateSecurityInfo
 * @param okforSecurityInfo
 * @param profile
 * @param recovery_email
 * @param secondary_email
 * @param setProfile
 * @param showButtonforSecurityInfo
 * @param textChangeforSecurityInfo
 * @constructor
 */
export function SecurityInformation(
  errorEffectforSecurityInfo,
  errorMessageforSecurityInfo,
  handleChangeForSecurityInfo,
  handleUpdateSecurityInfo,
  okforSecurityInfo,
  profile,
  recovery_email,
  secondary_email,
  setProfile,
  showButtonforSecurityInfo,
  textChangeforSecurityInfo,
) {
  return (
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
            As of now, you can only prove your identity by providing your email
            address. In the future, you will be able to provide other ways to
            prove your identity.
          </p>
        </div>
        <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
          <form onSubmit={handleUpdateSecurityInfo}>
            <div className="flex flex-col space-y-4">
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
                  onChange={handleChangeForSecurityInfo("secondary_email")}
                  placeholder="Secondary Email"
                  type="email"
                  value={secondary_email === null ? "" : secondary_email}
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
                  placeholder="Recovery Email"
                  type="email"
                  value={recovery_email === null ? "" : recovery_email}
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
                className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                type="submit"
              >
                {okforSecurityInfo ? (
                  <LoadingAnimation moreClasses="text-teal-600" />
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
  );
}

/**
 * @description Sign In Information form.
 * @param confirm_password
 * @param errorEffectforPassword
 * @param errorEffectforUsername
 * @param errorMessageforPassword
 * @param errorMessageforUsername
 * @param handleChangeForPassword
 * @param handleChangeForUsername
 * @param handleUpdatePassword
 * @param handleUpdateUsername
 * @param new_password
 * @param okforPassword
 * @param okforUsername
 * @param old_password
 * @param profile
 * @param setProfile
 * @param showButtonforPassword
 * @param showButtonforUsername
 * @param template
 * @param textChangeforPassword
 * @param textChangeforUsername
 * @param username
 * @constructor
 */
export function SignInInformation(
  confirm_password,
  errorEffectforPassword,
  errorEffectforUsername,
  errorMessageforPassword,
  errorMessageforUsername,
  handleChangeForPassword,
  handleChangeForUsername,
  handleUpdatePassword,
  handleUpdateUsername,
  new_password,
  okforPassword,
  okforUsername,
  old_password,
  profile,
  setProfile,
  showButtonforPassword,
  showButtonforUsername,
  template,
  textChangeforPassword,
  textChangeforUsername,
  username,
) {
  return (
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
            We recommend that you periodically update your password to keep your
            account secure and prevent unauthorized access to your account.
          </p>
        </div>
        <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
          <form onSubmit={handleUpdateUsername}>
            <div className="flex flex-col space-y-4">
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
                  placeholder="Username"
                  type="text"
                  value={username}
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
                className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                type="submit"
              >
                {okforUsername ? (
                  <LoadingAnimation moreClasses="text-teal-600" />
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
          <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-col space-y-4">
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
                  value={old_password}
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
                  value={new_password}
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
                  value={confirm_password}
                />
              </div>
            </div>
            {/* Error message */}
            {errorMessageforPassword ? (
              <div className="mt-2 text-sm font-semibold text-red-500">
                {errorMessageforPassword}
              </div>
            ) : null}
            <div className={`mt-6 space-y-6 ${template ? "hidden" : "block"}`}>
              <PasswordChecklist
                className="text-sm text-gray-500"
                iconSize={8}
                minLength={8}
                onChange={(isValid) => {
                  setProfile({
                    ...profile,
                    showButtonforPassword: !isValid,
                  });
                }}
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                value={new_password}
                valueAgain={confirm_password}
              />
              <div
                className={`flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2
                          ${showButtonforPassword ? "hidden" : "block"}`}
              >
                <button
                  className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                  type="submit"
                >
                  {okforPassword ? (
                    <LoadingAnimation moreClasses="text-teal-600" />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * @description To view the Insigth History
 * @param handleViewFile
 * @param handleSelect
 * @param school_year
 * @param school_year_to_choose
 * @param school_semester
 * @param school_semester_to_choose
 * @param csv_question
 * @param csv_question_to_choose
 * @param errorMessage
 * @param ok
 * @param textChange
 * @returns {JSX.Element}
 * @constructor
 */
export function ViewInsightHistory(
  handleViewFile,
  handleSelect,
  school_year,
  school_year_to_choose,
  school_semester,
  school_semester_to_choose,
  csv_question,
  csv_question_to_choose,
  errorMessage,
  ok,
  textChange,
) {
  return (
    <form onSubmit={handleViewFile}>
      <div className="flex flex-col w-full space-y-2">
        <Listbox name={"school_year"} onChange={handleSelect("school_year")}>
          <Listbox.Label className="block text-base font-bold text-blue-500">
            View by:
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className={TEXT_FIELD}>
              <span className="block truncate text-start text-gray-500">
                {school_year ? school_year : "Select School Year"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {school_year_to_choose.map((file) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                      }`
                    }
                    key={file.id}
                    value={file.school_year}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {file.school_year}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                            <CheckIcon aria-hidden="true" className="w-5 h-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <Listbox
          name={"school_semester"}
          onChange={handleSelect("school_semester")}
        >
          <div className="relative mt-1">
            <Listbox.Button className={TEXT_FIELD}>
              <span className="block truncate text-start text-gray-500">
                {school_semester ? school_semester : "Select Semester"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {school_semester_to_choose.map((file) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                      }`
                    }
                    key={file.id}
                    value={file.school_semester}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {file.school_semester}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon aria-hidden="true" className="w-5 h-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <Listbox name={"csv_question"} onChange={handleSelect("csv_question")}>
          <div className="relative mt-1">
            <Listbox.Button className={TEXT_FIELD}>
              <span className="block truncate text-start text-gray-500">
                {csv_question ? csv_question : "Select Topic"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {csv_question_to_choose.map((file) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                      }`
                    }
                    key={file.id}
                    value={file.csv_question}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {file.csv_question}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                            <CheckIcon aria-hidden="true" className="w-5 h-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex flex-col justify-end w-full mt-8 lg:space-x-2">
        <button
          className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
          type="submit"
        >
          {ok ? (
            <LoadingAnimation moreClasses="text-teal-600" />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faMagnifyingGlassChart}
              size={"lg"}
            />
          )}
          {textChange}
        </button>
      </div>
    </form>
  );
}
