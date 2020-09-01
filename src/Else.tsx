import React, { Fragment } from "react";
import { IProps } from "./interfaces/Component";

interface IElseProps extends IProps {
  show?: boolean;
}

export const Else = ({
  children,
  show = true,
  tag = "div",
  className = "",
  useFragment = false,
}: IElseProps) => {
  const Component: any = tag;

  return (
    show &&
    (useFragment ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Component className={className}>{children}</Component>
    ))
  );
};
