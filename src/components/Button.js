import React from "react";
import PropTypes from "prop-types";

const Button = ({ title, isDisabled, onClick, className }) => (
  <button
    type="button"
    disabled={isDisabled}
    onClick={() => onClick()}
    className={className}
  >
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  onClick: () => {},
  className: "",
};

export default Button;
