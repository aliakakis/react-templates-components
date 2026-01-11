import type { ExoticComponent, FragmentProps } from "react";
import type { RtSharedProps } from "./interfaces/Component";
import { Fragment } from "react";

export function Repeat({
  children,
  tag = "div",
  className = "",
  useFragment = false,
}: RtSharedProps) {
  const Component: string | ExoticComponent<FragmentProps> = useFragment
    ? Fragment
    : tag;
  const hasComponentProps = !useFragment && { className };

  return <Component {...hasComponentProps}>{children}</Component>;
}
