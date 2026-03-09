import type { ExoticComponent, FragmentProps, ReactNode } from 'react';
import type { RtSharedProps } from './interfaces/Component';
import React, { Fragment, isValidElement, useMemo } from 'react';
import { Error } from './Error';

interface CaseProps extends RtSharedProps {
  expressionValue: string | number;
}

export function Case({ children }: CaseProps) {
  return children;
}

interface CasesProps extends RtSharedProps {
  expression: string | number;
  defaultExpressionValue?: string | number;
}

function resolveCaseItem(
  caseNode: ReactNode[],
  defaultCaseNode: ReactNode[],
  expression: string | number
): ReactNode {
  const hasNoMatches = caseNode.length === 0 && defaultCaseNode.length === 0;
  const hasDuplicates = caseNode.length > 1 || defaultCaseNode.length > 1;
  const hasMatches = caseNode.length > 0;
  const hasDefaultCase = defaultCaseNode.length > 0;

  if (hasNoMatches) {
    return (
      <Error>
        No items found for expressionValue: <strong>{expression}</strong> in
        Cases component
      </Error>
    );
  }

  if (hasDuplicates) {
    return (
      <Error>
        You most probably have set the same expressionValue in your Case
        components
      </Error>
    );
  }

  if (hasMatches) {
    return caseNode;
  } else if (hasDefaultCase) {
    return defaultCaseNode;
  }

  return <Error>There was an error please check your code</Error>;
}

function filterChildrenByExpression(
  children: React.ReactNode[],
  targetValue: string | number | undefined
): React.ReactNode[] {
  return children.filter(
    (childItem) =>
      isValidElement(childItem) &&
      (childItem.props as CaseProps).expressionValue === targetValue
  );
}

export function Cases({
  children,
  expression,
  tag = 'div',
  className = '',
  useFragment = false,
  defaultExpressionValue = 'default',
}: CasesProps) {
  const Component: string | ExoticComponent<FragmentProps> = useFragment
    ? Fragment
    : tag;
  const hasComponentProps = !useFragment && { className };

  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const caseNode = useMemo(
    () => filterChildrenByExpression(childrenArray, expression),
    [childrenArray, expression]
  );

  const defaultCaseNode = useMemo(
    () => filterChildrenByExpression(childrenArray, defaultExpressionValue),
    [childrenArray, defaultExpressionValue]
  );

  return (
    <Component {...hasComponentProps}>
      {resolveCaseItem(caseNode, defaultCaseNode, expression)}
    </Component>
  );
}
