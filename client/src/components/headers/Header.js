import PropTypes from "prop-types";
import React from "react";

/**
 * @description Header for the page
 * @param title
 * @param body
 * @constructor
 */
export function Header({ title, body }) {
  Header.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 rounded-lg bg-blue-50 shadow">
      <div className="grid w-full grid-cols-1 rounded">
        <div className="col-span-1 w-full">
          <div className="flex flex-row w-full p-4 justify-center items-center">
            <h1 className="text-2xl font-extrabold leading-none text-left text-blue-500 md:text-5xl lg:text-7xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-row justify-center w-full p-4">
            <p className="text-base font-medium text-blue-500">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
