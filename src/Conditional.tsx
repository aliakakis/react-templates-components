import React, { Fragment } from "react";
import { IProps } from "./interfaces/Component";

interface IConditionalProps extends IProps {
  condition?: boolean;
}

export const Conditional = ({
  children,
  condition = true,
  tag = "div",
  className = "",
  useFragment = false,
}: IConditionalProps) => {
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
