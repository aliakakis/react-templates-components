import React, {Component} from 'react';
import PropTypes from 'prop-types';

function cloneDeep(source) {
    if (source instanceof Array) {
        const cloneArray = [];
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
        const cloneObject = {};
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

function getNestedObjectValue(obj, path) {
    const deep = path.split('.');
    for (let value of deep) {
        obj = obj[value];
    }
    return obj;
}

function changeValuePropsChildren(sourceArray, reactElement = {}, iteratorItem, props) {
    const { stringInterpolationIdentifier,
            iteratorKeyIdentifier,
            iteratorKeyGenerator } = props;

    if (sourceArray instanceof Array) {
        for (let item of sourceArray) {
            if (item instanceof Array) {
                changeValuePropsChildren(item, {}, iteratorItem, props);
            }
            else if (React.isValidElement(item)) {
                item.key = new Date().getMilliseconds();
                if (item.props.iteratorkey !== 'undefined') {
                    if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(item.props.iteratorkey)) {
                        item.props.iteratorkey = typeof iteratorKeyGenerator === 'undefined' ?
                            new Date().getMilliseconds() : iteratorKeyGenerator;
                        item.key = typeof iteratorKeyGenerator === 'undefined' ?
                            new Date().getMilliseconds() : iteratorKeyGenerator;
                    }
                }
                changeValuePropsChildren(item.props.children, item, iteratorItem, props);
            }
            else if (typeof item === 'string') {
                if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(item)) {
                    if (item.split(stringInterpolationIdentifier + '.').length > 1) {
                        sourceArray[sourceArray.indexOf(item)] =
                            getNestedObjectValue(iteratorItem, item.split(stringInterpolationIdentifier + '.')[1]);
                    }
                    else {
                        sourceArray[sourceArray.indexOf(item)] = iteratorItem;
                    }
                }
                if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(item)) {
                    sourceArray[sourceArray.indexOf(item)] = typeof iteratorKeyGenerator === 'undefined' ?
                        new Date().getMilliseconds() : iteratorKeyGenerator;
                }
            }
        }
    }
    else {
        if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(sourceArray)) {
            if (sourceArray.split(stringInterpolationIdentifier + '.').length > 1) {
                sourceArray[sourceArray.indexOf(sourceArray)] =
                    getNestedObjectValue(iteratorItem, sourceArray.split(stringInterpolationIdentifier + '.')[1]);
            }
            else {
                reactElement.props.children = iteratorItem;
            }
        }
        if ( new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(sourceArray)) {
            reactElement.props.children = typeof iteratorKeyGenerator === 'undefined' ?
                new Date().getMilliseconds() : iteratorKeyGenerator;
        }
    }
}

function repeatChildren(source, iterator, props) {
    if (typeof source === 'undefined') {
        throw new SyntaxError('Please add children inside Repeat');
    }

    return iterator.map((iteratorItem) => {
        const cloneArray = cloneDeep(source);

        changeValuePropsChildren(cloneArray, {}, iteratorItem, props);
        return cloneArray;
    });
}

export default function Repeat(props) {
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
    iteratorKeyIdentifier: '@key',
};

Repeat.propTypes = {
    iterator: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
    ]).isRequired,
    tag: PropTypes.string,
    className: PropTypes.string,
    stringInterpolationIdentifier: PropTypes.string,
    iteratorKeyIdentifier: PropTypes.string,
    iteratorKeyGenerator: PropTypes.any,
};
