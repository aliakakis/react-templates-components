import React, { Fragment } from "react";
import { Props } from "./interfaces/Component";

interface ConditionalProps extends Props {
  condition?: boolean;
}

const Conditional = ({
  children,
  condition = true,
  tag = "div",
  className = "",
  useFragment = false,
}: ConditionalProps): JSX.Element => {
  const Component: any = tag;

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

export default Conditional;
