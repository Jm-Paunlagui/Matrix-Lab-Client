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
  icon,
  href,
  moreStyle,
  disabled = false,
}) {
  const style = `flex transition-colors duration-700 ease-in-out delay-150 border border-transparent rounded-lg py-4 ${moreStyle}`;
  const icon_style = `place-self-center ${icon}`;
  return isButton ? (
    <button
      className={style}
      type="button"
      onClick={action}
      disabled={disabled}
    >
      <i className={icon_style} /> {title}
    </button>
  ) : (
      <Link
          className={style}
        to={href}
      >
        <i className={icon_style} />
        {title}
      </Link>
  );
}

Button.propTypes = {
  isButton: PropTypes.bool,
  title: PropTypes.string,
  action: PropTypes.func,
  icon: PropTypes.string,
  href: PropTypes.string,
  moreStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
