/* eslint-disable react/prop-types */
import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  full,
  color = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 rounded-lg bg-${color} capitalize mt-auto ${className} ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
