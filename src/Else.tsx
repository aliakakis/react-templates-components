import type { ExoticComponent, FragmentProps } from 'react';
import type { RtSharedProps } from './interfaces/Component';
import { Fragment } from 'react';

interface ElseProps extends RtSharedProps {
  show?: boolean;
}

export function Else({
  children,
  show = true,
  tag = 'div',
  className = '',
  useFragment = false,
}: ElseProps) {
  const Component: string | ExoticComponent<FragmentProps> = useFragment
    ? Fragment
    : tag;
  const hasComponentProps = !useFragment && { className };

  return show && <Component {...hasComponentProps}>{children}</Component>;
}
