import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Props } from "./interfaces/component";

export default function Conditional(props: Props) {
  const { children, condition, tag: Component, className, useFragment } = props;

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
}

Conditional.defaultProps = {
  condition: true,
  tag: "div",
  className: "",
  useFragment: false
};

Conditional.propTypes = {
  condition: PropTypes.bool.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool
};
