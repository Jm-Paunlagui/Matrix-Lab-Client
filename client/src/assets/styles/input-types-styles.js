import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarning} from "@fortawesome/free-solid-svg-icons";

export const TEXT_FIELD = `w-full p-4 text-sm font-medium tracking-wider placeholder-gray-500 border border-gray-200 rounded-lg`;

export const DELAY_1 = "transition duration-300 ease-in-out delay-150";
export const DELAY_3 = "transition duration-300 ease-in-out delay-300";
export const DELAY_5 = "transition duration-300 ease-in-out delay-500";
export const DELAY_7 = "transition duration-300 ease-in-out delay-700";
export const DELAY_9 = "transition duration-300 ease-in-out delay-1000";
export const ICON_PLACE_SELF_CENTER = "pr-2 place-self-center";
export const ICON_PLACE_SELF_CENTER_1 = "place-self-center";

export const DEFAULT_BUTTON_TRANSITION = `${DELAY_3} border border-transparent rounded-lg`;

// px-5 py-3 pl-4 for a button
// px-5 py-3 for link
export const DEFAULT_BUTTON = `font-semibold tracking-wide text-gray-500 border-2 hover:text-black ${DEFAULT_BUTTON_TRANSITION}`;
export const PRIMARY_BUTTON = `font-semibold tracking-wide text-white bg-blue-500 border-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const SECONDARY_BUTTON = `font-semibold tracking-wide text-white bg-indigo-500 border-2 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const SUCCESS_BUTTON = `font-semibold tracking-wide text-white bg-teal-500 border-2 hover:bg-white hover:text-teal-500 hover:border-teal-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const DANGER_BUTTON = `font-semibold tracking-wide text-white bg-red-500 border-2 hover:bg-white hover:text-red-500 hover:border-red-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const WARNING_BUTTON = `font-semibold tracking-wide text-white bg-yellow-500 border-2 hover:bg-white hover:text-yellow-500 hover:border-yellow-500 ${DEFAULT_BUTTON_TRANSITION};`;
export const INFO_BUTTON = `font-semibold tracking-wide text-white bg-blue-500 border-2 hover:bg-white hover:text-blue-500 hover border-blue-500 ${DEFAULT_BUTTON_TRANSITION}`;

export const PRIMARY_RADIO = `bg-white text-gray-500 border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-500 peer-checked:text-blue-500 peer-checked:ring-2 peer-checked:border-transparent ${DEFAULT_BUTTON_TRANSITION}`;
export const SECONDARY_RADIO = `bg-white text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-indigo-500 peer-checked:text-blue-500 peer-checked:ring-2 peer-checked:border-transparent ${DEFAULT_BUTTON_TRANSITION}`;

/**
 * @description Circular loading animation
 */
export const LOADING_ANIMATION = () => {
    return (
        <svg className="mr-1 spinner" viewBox="0 0 50 50">
            <circle
                className="path"
                cx="25"
                cy="25"
                fill="transparent"
                r="20"
                strokeWidth="5"
            />
        </svg>
    );
};

/**
 * @description Recovery email not set
 */
export const EMAIL_NOT_SET = (email_type= "") => {
    return (
        <div className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 border-yellow-600 rounded-lg cursor-default text-white bg-yellow-400`}>
            <FontAwesomeIcon className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faWarning}
                size={"lg"}
            />
            {email_type} email not set up yet for this account.
        </div>
    );
}
