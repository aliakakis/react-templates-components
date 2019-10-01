import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Props } from "./interfaces/component";

export default function If(props: Props) {
  const { children, show, tag: Component, className, useFragment } = props;

  return show && useFragment ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Component className={className}>{children}</Component>
  );
}

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
