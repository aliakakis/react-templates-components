import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Props } from "./interfaces/component";

const If = ({
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

If.defaultProps = {
  show: true,
  tag: "div",
  className: "",
  useFragment: false
};

If.propTypes = {
  show: PropTypes.bool,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool
};

export default If;
