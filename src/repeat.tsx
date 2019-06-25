import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GenericObject } from "./interfaces/global";
import { Props } from "./interfaces/component";

function cloneDeep(source: any): any {
    if (source instanceof Array) {
        const cloneArray: any[] = [];
        for (let item of source) {
            if (item instanceof Array) {
                cloneArray.push(cloneDeep(item));
            }
            else if (item instanceof Object) {
                cloneArray.push(cloneDeep(item));
            }
            else {
                cloneArray.push(item);
            }
        }
        return cloneArray;
    }
    else if (source instanceof Object) {
        const cloneObject: GenericObject = {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (source[prop] instanceof Array) {
                    cloneObject[prop] = cloneDeep(source[prop]);
                }
                else if (source[prop] instanceof Object) {
                    cloneObject[prop] = cloneDeep(source[prop]);
                }
                else {
                    cloneObject[prop] = source[prop];
                }
            }
        }
        return cloneObject;
    }
}

function getNestedObjectValue(obj: GenericObject, path: string) {
    const deep = path.split('.');
    for (let value of deep) {
        obj = obj[value];
    }
    return obj;
}

function changeValuePropsChildren(source: any, reactElement: GenericObject = {}, iteratorItem: any, props: Props) {
    const { stringInterpolationIdentifier, useRandomKeyForIteration } = props;

    if (source instanceof Array) {
        for (let item of source) {
            if (item instanceof Array) {
                changeValuePropsChildren(item, {}, iteratorItem, props);
            }
            else if (React.isValidElement(item)) {
                const element: GenericObject = item;

                if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(element.key)) {
                    if (element.key.split(stringInterpolationIdentifier + '.').length > 1) {
                        element.key = getNestedObjectValue(iteratorItem, element.key.split(stringInterpolationIdentifier + '.')[1]);
                    }
                } else {
                    if (useRandomKeyForIteration && element.key === null) {
                        element.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    }
                }

                for (let prop in element.props) {
                    if (element.props.hasOwnProperty(prop) && prop !== "children") {
                        if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(element.props[prop])) {
                            if (element.props[prop].split(stringInterpolationIdentifier + '.').length > 1) {
                                element.props[prop] = getNestedObjectValue(iteratorItem, element.props[prop].split(stringInterpolationIdentifier + '.')[1]);
                            }
                        }
                    }
                }

                changeValuePropsChildren(element.props.children, item, iteratorItem, props);
            }
            else if (typeof item === 'string') {
                if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(item)) {
                    if (item.split(stringInterpolationIdentifier + '.').length > 1) {
                        source[source.indexOf(item)] = getNestedObjectValue(iteratorItem, item.split(stringInterpolationIdentifier + '.')[1]);
                    }
                }
            }
        }
    }
    else {
        if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(source)) {
            if (source.split(stringInterpolationIdentifier + '.').length > 1) {
                reactElement.props.children = getNestedObjectValue(iteratorItem, source.split(stringInterpolationIdentifier + '.')[1]);
            }
        }
    }
}

function repeatChildren(children: GenericObject, iterator: any[], props: Props) {
    if (typeof children === 'undefined') {
        throw new SyntaxError('Please add children inside Repeat');
    }

    return iterator.map((iteratorItem: any) => {
        const cloneChildren = cloneDeep(children);

        changeValuePropsChildren(cloneChildren, {}, iteratorItem, props);
        return cloneChildren;
    });
}

export default function Repeat(props: Props) {
    const { iterator,
            children,
            tag,
            className } = props;

    const Component = tag;

    if (typeof iterator === 'undefined') {
        throw new SyntaxError('The iterator prop is mandatory');
    }

    return (
        <Component className={className}>
            {
                repeatChildren(children, typeof iterator === 'number' ? [...new Array(iterator)] : iterator, props)
            }
        </Component>
    );
}

Repeat.defaultProps = {
    tag: 'div',
    className: '',
    stringInterpolationIdentifier: '@iterator',
    useRandomKeyForIteration: true
};

Repeat.propTypes = {
    iterator: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
    ]).isRequired,
    tag: PropTypes.string,
    className: PropTypes.string,
    stringInterpolationIdentifier: PropTypes.string,
    useRandomKeyForIteration: PropTypes.bool
};
