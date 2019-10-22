import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { GenericObject } from "./interfaces/Global";
import { Props } from "./interfaces/Component";

const getNestedObjectValue = (obj: GenericObject, path: string) => {
  if (path.split(".").length > 1) {
    const deep = path.split(".");
    for (let value of deep) {
      obj = obj[value];
    }
    return obj;
  } else {
    return obj[path];
  }
};

const changeValuePropsChildren = (
  source: any,
  reactElement: GenericObject = {},
  iteratorItem: any,
  props: Props
) => {
  const { stringInterpolationIdentifier } = props;

  if (source instanceof Array) {
    for (let item of source) {
      if (item instanceof Array) {
        changeValuePropsChildren(item, {}, iteratorItem, props);
      } else if (React.isValidElement(item)) {
        const element: GenericObject = item;

        for (let prop in element.props) {
          if (element.props.hasOwnProperty(prop) && prop !== "children") {
            if (
              new RegExp("(" + stringInterpolationIdentifier + ")", "g").test(
                element.props[prop]
              )
            ) {
              if (
                element.props[prop].split(stringInterpolationIdentifier + ".")
                  .length > 1
              ) {
                element.props[prop] = getNestedObjectValue(
                  iteratorItem,
                  element.props[prop].split(
                    stringInterpolationIdentifier + "."
                  )[1]
                );
              } else {
                element.props[prop] = iteratorItem;
              }
            }
          }
        }

        changeValuePropsChildren(
          element.props.children,
          item,
          iteratorItem,
          props
        );
      } else if (typeof item === "string") {
        if (
          new RegExp("(" + stringInterpolationIdentifier + ")", "g").test(item)
        ) {
          if (item.split(stringInterpolationIdentifier + ".").length > 1) {
            source[source.indexOf(item)] = getNestedObjectValue(
              iteratorItem,
              item.split(stringInterpolationIdentifier + ".")[1]
            );
          } else {
            source[source.indexOf(item)] = iteratorItem;
          }
        }
      }
    }
  } else {
    if (
      new RegExp("(" + stringInterpolationIdentifier + ")", "g").test(source)
    ) {
      if (source.split(stringInterpolationIdentifier + ".").length > 1) {
        reactElement.props.children = getNestedObjectValue(
          iteratorItem,
          source.split(stringInterpolationIdentifier + ".")[1]
        );
      } else {
        reactElement.props.children = iteratorItem;
      }
    }
  }
};

const repeatChildren = (
  children: GenericObject,
  iteratorItem: any[],
  props: Props
) => {
  if (typeof children === "undefined") {
    throw new SyntaxError("Please add children inside Repeat");
  }

  changeValuePropsChildren(children, {}, iteratorItem, props);

  return children;
};

const calculateKey = (
  setKey: string,
  item: any,
  stringInterpolationIdentifier: string,
  index: number
) => {
  let key: string | number;

  if (setKey === "index") {
    key = index;
  } else if (setKey === stringInterpolationIdentifier) {
    key = item;
  } else {
    key = getNestedObjectValue(
      item,
      setKey.split(stringInterpolationIdentifier + ".")[1]
    );
  }

  return key;
};

export const Repeat = (props: Props) => {
  const {
    iterator,
    children,
    tag: Component,
    className,
    useFragment,
    setKey,
    stringInterpolationIdentifier
  } = props;

  if (typeof iterator === "undefined") {
    throw new SyntaxError("The iterator prop is mandatory");
  }

  let iteratorSrc: any[] =
    typeof iterator === "number" ? [...new Array(iterator)] : iterator;

  return useFragment
    ? iteratorSrc.map((item: any, index: number) => {
        return (
          <Fragment
            key={calculateKey(
              setKey,
              item,
              stringInterpolationIdentifier,
              index
            )}
          >
            {repeatChildren(children, item, props)}
          </Fragment>
        );
      })
    : iteratorSrc.map((item: any, index: number) => {
        return (
          <Component
            className={className}
            key={calculateKey(
              setKey,
              item,
              stringInterpolationIdentifier,
              index
            )}
          >
            {repeatChildren(children, item, props)}
          </Component>
        );
      });
};

Repeat.defaultProps = {
  tag: "div",
  className: "",
  useFragment: false,
  stringInterpolationIdentifier: "@iterator"
};

Repeat.propTypes = {
  iterator: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  useFragment: PropTypes.bool,
  setKey: PropTypes.string.isRequired,
  stringInterpolationIdentifier: PropTypes.string
};
