import React, { Fragment } from "react";
import { IProps } from "./interfaces/Component";
import { IObject } from "./interfaces/Object";

interface ICaseProps extends IProps {
  expressionValue: any;
}

export const Case = ({ children }: ICaseProps) => children;

interface ICasesProps extends IProps {
  condition?: unknown;
  expression: unknown;
}

export const Cases = ({
  children,
  condition,
  expression,
  tag = "div",
  className = "",
  useFragment = false
}: ICasesProps) => {
  let CaseItem = null;
  const Component: any = tag;

  if (React.Children.count(children) < 2) {
    throw new SyntaxError(
      "You must include at least two cases with one marked as default"
    );
  }

  if (React.Children.count(children) > 2) {
    let filteredArrayElement = children.filter((childItem: IObject) => {
      return childItem.props.expressionValue === expression;
    });

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
