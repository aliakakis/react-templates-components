import React, { Fragment } from "react";
import { IProps } from "./interfaces/Component";

interface IIfProps extends IProps {
  show?: boolean;
}

export const If = ({
  children,
  show = true,
  tag = "div",
  className = "",
  useFragment = false,
}: IIfProps) => {
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
