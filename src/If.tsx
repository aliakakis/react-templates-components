import React, { Fragment } from "react";
import { Props } from "./interfaces/Component";

interface IfProps extends Props {
  show?: boolean;
}

const If = ({
  children,
  show = true,
  tag = "div",
  className = "",
  useFragment = false,
}: IfProps): JSX.Element => {
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

export default If;
