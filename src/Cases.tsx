import React, { Fragment } from "react";
import { Props } from "./interfaces/Component";

interface ICaseProps extends Props {
  expressionValue: any;
}

export const Case = ({ children }: ICaseProps) => children;

interface CasesProps extends Props {
  condition?: any;
  expression: any;
}

export const Cases = ({
  children,
  condition,
  expression,
  tag = "div",
  className = "",
  useFragment = false,
}: CasesProps): JSX.Element => {
  let CaseItem = null;
  const Component: any = tag;

  if (React.Children.count(children) < 2) {
    throw new SyntaxError(
      "You must include at least two cases with one marked as default"
    );
  }

  if (React.Children.count(children) > 2) {
    let filteredArrayElement = children.filter(
      (childItem: Record<string, any>) => {
        return childItem.props.expressionValue === expression;
      }
    );

    if (filteredArrayElement.length === 0) {
      CaseItem = children[children.length - 1];
    } else if (filteredArrayElement.length > 1) {
      throw new SyntaxError(
        "You most probably have set the same expressionValue in your Case components"
      );
    } else {
      CaseItem = filteredArrayElement;
    }
  }

  return useFragment ? (
    <Fragment>
      {React.Children.count(children) > 2
        ? CaseItem
        : condition
        ? children[0]
        : children[1]}
    </Fragment>
  ) : (
    <Component className={className}>
      {React.Children.count(children) > 2
        ? CaseItem
        : condition
        ? children[0]
        : children[1]}
    </Component>
  );
};
