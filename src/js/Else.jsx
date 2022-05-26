import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Else = ({
  children,
  show = true,
  tag: Component = "div",
  className = "",
  useFragment = false,
}) => {
  return show ? (
    useFragment ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Component className={className}>{children}</Component>
    )
  ) : (
    <Fragment />
  );
};

Else.propTypes = {
  show: PropTypes.bool,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool,
};

export default Else;
