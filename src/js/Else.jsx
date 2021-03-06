import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const Else = ({
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

Else.propTypes = {
  show: PropTypes.bool,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool,
};
