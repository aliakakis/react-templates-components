import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Props } from "./interfaces/Component";

export const Else = ({
  children,
  show,
  tag: Component,
  className,
  useFragment
}: Props) => {
  return (
    show &&
    (useFragment ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Component className={className}>{children}</Component>
    ))
  );
};

Else.defaultProps = {
  show: true,
  tag: "div",
  className: "",
  useFragment: false
};

Else.propTypes = {
  show: PropTypes.bool,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool
};
