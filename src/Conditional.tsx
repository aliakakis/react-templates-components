import type { ExoticComponent, FragmentProps, ReactNode } from 'react';
import type { RtSharedProps } from './interfaces/Component';
import { Fragment, useMemo } from 'react';
import { Error } from './Error';

interface ConditionalProps extends RtSharedProps {
  condition?: boolean;
}

function resolveConditional(
  conditionals: ReactNode[],
  condition: boolean
): ReactNode {
  const hasNoMatches = conditionals.length === 0;
  const hasAboveTwo = conditionals.length > 2;
  const hasLessThanTwo = conditionals.length < 2;

  if (hasNoMatches || hasAboveTwo || hasLessThanTwo) {
    return (
      <Error>
        You must include exactly one If component and one Else component
      </Error>
    );
  }

  return condition ? conditionals[0] : conditionals[1];
}

export function Conditional({
  children,
  condition = true,
  tag = 'div',
  className = '',
  useFragment = false,
}: ConditionalProps) {
  const Component: string | ExoticComponent<FragmentProps> = useFragment
    ? Fragment
    : tag;
  const hasComponentProps = !useFragment && { className };

  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  return (
    <Component {...hasComponentProps}>
      {resolveConditional(childrenArray, condition)}
    </Component>
  );
}
