import type { ExoticComponent, FragmentProps, ReactNode } from 'react';
import type { RtSharedProps } from './interfaces/Component';
import { Fragment } from 'react';

export interface RepeatProps<T> extends Omit<RtSharedProps, 'children'> {
  items: T[];
  children: (item: T) => ReactNode;
}

export function Repeat({
  items,
  children,
  tag = 'div',
  className = '',
  useFragment = false,
}: RepeatProps<unknown>) {
  const Component: string | ExoticComponent<FragmentProps> = useFragment
    ? Fragment
    : tag;
  const hasComponentProps = !useFragment && { className };

  const renderChildren = (item: T) => children(item);

  return <Component {...hasComponentProps}>{renderChildren()}</Component>;
}
