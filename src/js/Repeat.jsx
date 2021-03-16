import React, { Fragment } from "react";
import PropTypes from "prop-types";
import cloneDeep from "lodash.clonedeep";

const getNestedObjectValue = (obj, path) => {
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
  source,
  reactElement = {},
  iteratorItem,
  props
) => {
  if (typeof source === "undefined") {
    throw new SyntaxError("Please add children inside Repeat");
  }

  const { stringInterpolationIdentifier } = props;

  if (source instanceof Array) {
    for (let item of source) {
      if (item instanceof Array) {
        changeValuePropsChildren(item, {}, iteratorItem, props);
      } else if (item instanceof Object) {
        const element = item;

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
        source = getNestedObjectValue(
          iteratorItem,
          source.split(stringInterpolationIdentifier + ".")[1]
        );
      } else {
        source = iteratorItem;
      }
    }
  }
  return source;
};

const calculateKey = (setKey, item, stringInterpolationIdentifier, index) => {
  let key;

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

export const Repeat = ({
  iterator,
  children,
  tag: Component = "div",
  className = "",
  useFragment = false,
  setKey = "index",
  stringInterpolationIdentifier = "@iterator",
}) => {
  if (typeof iterator === "undefined") {
    throw new SyntaxError("The iterator prop is mandatory");
  }

  let iteratorProp =
    typeof iterator === "number" ? [...new Array(iterator)] : iterator;

  return useFragment
    ? iteratorProp.map((item, index) => {
        return (
          <Fragment
            key={calculateKey(
              setKey,
              item,
              stringInterpolationIdentifier,
              index
            )}
          >
            {changeValuePropsChildren(cloneDeep(children), {}, item, props)}
          </Fragment>
        );
      })
    : iteratorProp.map((item, index) => {
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
            {changeValuePropsChildren(cloneDeep(children), {}, item, props)}
          </Component>
        );
      });
};

Repeat.propTypes = {
  iterator: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
  tag: PropTypes.string,
  className: PropTypes.string,
  stringInterpolationIdentifier: PropTypes.string,
  useRandomKeyForIteration: PropTypes.bool,
  useFragment: PropTypes.bool,
};
