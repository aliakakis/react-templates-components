import React, { Fragment } from "react";
import PropTypes from "prop-types";

export const Case = ({ children }) => children;

Case.propTypes = {
  expressionValue: PropTypes.any.isRequired,
};

export const Cases = ({
  children,
  condition,
  expression,
  tag: Component = "div",
  className = "",
  useFragment = false,
}) => {
  let CaseItem = null;

  if (React.Children.count(children) < 2) {
    throw new SyntaxError(
      "You must include at least two cases with one marked as default"
    );
  }

  if (React.Children.count(children) > 2) {
    let filteredArrayElement = children.filter((childItem) => {
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

Cases.propTypes = {
  expression: PropTypes.any.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool,
};
