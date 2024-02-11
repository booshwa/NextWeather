import React from "react";

const RenderValue = ({ value }) => {
  if (value) {
    return value;
  }

  return <>-</>;
};

export default RenderValue;
