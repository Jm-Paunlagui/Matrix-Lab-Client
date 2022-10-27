import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
    faEnvelope,
    faRepeat,
    faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    EMAIL_NOT_SET,
    ICON_PLACE_SELF_CENTER,
    LOADING_ANIMATION,
    PRIMARY_BUTTON,
    PRIMARY_RADIO,
    SECONDARY_BUTTON,
    TEXT_FIELD,
} from "../assets/styles/input-types-styles";


export function UsernamePassword(username, password, oki, textChange, handleAuthFormSubmit, errorEffect, handleAuthFormChange, errorMessage) {
    return (
        <form
            className="relative mx-auto mt-6 mb-6 max-w-screen"
            onSubmit={handleAuthFormSubmit}
        >
            <input
                className={`${TEXT_FIELD} ${
                    errorEffect &&
                    `border-red-500 placeholder-red-500 text-red-500`
                }`}
                name="username"
                onChange={handleAuthFormChange}
                placeholder="Username"
                type="username"
                value={username}
            />
            <input
                className={`pr-12 mt-5 ${TEXT_FIELD} ${
                    errorEffect &&
                    `border-red-500 placeholder-red-500 text-red-500`
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
                    className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                    type="submit"
                >
                    {oki ? (
                        LOADING_ANIMATION()
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

export function TFAbyEmail(email, id1, id2, id3, oki, textChange, handle2FAFormSubmit, errorEffect, handleAuthFormChange, errorMessage) {
    return (
        <form
            className="relative mx-auto mt-6 mb-6 max-w-screen"
            onSubmit={handle2FAFormSubmit}
        >
            {/*  Choice of identity */}
            <div className="flex flex-col justify-center mt-6 space-y-6">
                {id1 ? (
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
                            <p className="truncate">Email {id1}</p>
                        </label>
                    </li>
                ) : (
                    EMAIL_NOT_SET("Primary")
                )}
                {id2 ? (
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
                            <p className="truncate">Email {id2}</p>
                        </label>
                    </li>
                ) : (
                    EMAIL_NOT_SET("Secondary")
                )}
                {id3 ? (
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
                            <p className="truncate">Email {id3}</p>
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
                    {oki ? LOADING_ANIMATION() : null}
                    {textChange}
                </button>
            </div>
        </form>
    );
}

export function VerifyTFA(code, oki, textChange, handle2FAFormSubmit, handle2FAVerifyFormSubmit, errorEffect, handleAuthFormChange, errorMessage
    , buttonDisabled, textChange2, count, setCount, countDown, setAuthForm, authForm, setErrorMessage) {
    return (
        <>
            <form className="relative mx-auto mt-6 mb-6 max-w-screen">
                <input
                    className={`${TEXT_FIELD} ${
                        errorEffect &&
                        `border-red-500 placeholder-red-500 text-red-500`
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
                            onClick={handle2FAFormSubmit}
                            type="reset"
                        >
                            {oki ? (
                                LOADING_ANIMATION()
                            ) : (
                                <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faRepeat}
                                    size={"lg"}
                                />
                            )}
                            {textChange2}{" "}
                            {countDown !== 0 ? `(${countDown})` : null}
                        </button>
                    ) : (
                        <button
                            className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                            name="submit"
                            onClick={handle2FAVerifyFormSubmit}
                            type="submit"
                        >
                            {oki ? (
                                LOADING_ANIMATION()
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

