import type { ExoticComponent, FragmentProps } from "react";
import type { RtSharedProps } from "./interfaces/Component";
import { Fragment } from "react";


interface IfProps extends RtSharedProps {
  show?: boolean;
}

export function If({
  children,
  show = true,
  tag = "div",
  className = "",
  useFragment = false,
}: IfProps) {
  const Component: string | ExoticComponent<FragmentProps> = useFragment
    ? Fragment
    : tag;
  const hasComponentProps = !useFragment && { className };

  return show && <Component {...hasComponentProps}>{children}</Component>;
}
