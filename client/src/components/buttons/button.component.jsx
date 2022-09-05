import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

/**
 * @description Button component for the application if isButton is true else it will return a link
 * */

function Button({
  isButton = true,
  title = "",
  action,
  href,
  moreStyle,
  disabled = false,
}) {
  const style = `flex justify-center transition-colors duration-700 ease-in-out delay-150 border border-transparent rounded-md md:py-4 md:text-lg md:px-10  ${moreStyle}`;
  return isButton ? (
    <button
      className={style}
      type="button"
      onClick={action}
      disabled={disabled}
    >
      {title}
    </button>
  ) : (
    <Link to={href}>
      <div className={style}>{title}</div>
    </Link>
  );
}

Button.propTypes = {
  isButton: PropTypes.bool,
  title: PropTypes.string,
  action: PropTypes.func,
  href: PropTypes.string,
  moreStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
