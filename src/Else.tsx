import React, { Fragment } from "react";
import { Props } from "./interfaces/Component";

interface ElseProps extends Props {
  show?: boolean;
}

export const Else = ({
  children,
  show = true,
  tag = "div",
  className = "",
  useFragment = false,
}: ElseProps): JSX.Element => {
  const Component: any = tag;

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
