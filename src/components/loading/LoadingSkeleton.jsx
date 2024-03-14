/* eslint-disable react/prop-types */
import React from "react";

const LoadingSkeleton = (props) => {
  return <div className={`skeleton ${props.className}`}></div>;
};

export default LoadingSkeleton;
