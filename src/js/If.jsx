import PropTypes from "prop-types";
import React, { Fragment } from "react";

export const If = ({
  children,
  show = true,
  tag: Component = "div",
  className = "",
  useFragment = false,
}) => {
  return (
    show &&
    (useFragment ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Component className={className}>{children}</Component>
    ))
  );
};

If.propTypes = {
  show: PropTypes.bool,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool,
};
