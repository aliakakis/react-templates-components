import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const Conditional = ({
  children,
  condition = true,
  tag: Component = "div",
  className = "",
  useFragment = false,
}) => {
  if (React.Children.count(children) < 2) {
    throw new SyntaxError(
      "You must include an If component and an Else component"
    );
  }

  return useFragment ? (
    <Fragment>{condition ? children[0] : children[1]}</Fragment>
  ) : (
    <Component className={className}>
      {condition ? children[0] : children[1]}
    </Component>
  );
};

Conditional.propTypes = {
  condition: PropTypes.bool.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool,
};
