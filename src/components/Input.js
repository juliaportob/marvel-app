import React from "react";
import PropTypes from "prop-types";
import "../styles/Login.css";

const Input = ({ title, type, onChange, value, placeholder }) => (
  <div>
    <label htmlFor={title}>{title}</label>
    <input
      className="input-input"
      id={title}
      type={type}
      onChange={(e) => onChange(title, e.target.value)}
      value={value}
      placeholder={placeholder}
    />
  </div>
);

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

Input.defaultProps = {
  onChange: () => {},
  isReadOnly: false,
};

export default Input;
