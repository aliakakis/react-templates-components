import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RepeatComponent extends Component {

    constructor(props) {
        super(props);

        const { iterator } = props;

        if (typeof iterator === 'undefined') {
            throw new SyntaxError('The iterator prop is mandatory');
        }

        this.iterator = typeof iterator === 'number' ? [...new Array(iterator)] : iterator;
    }

    cloneDeep = (source) => {
        if (source instanceof Array) {
            const cloneArray = [];
            for (let item of source) {
                if (item instanceof Array) {
                    cloneArray.push(this.cloneDeep(item));
                }
                else if (item instanceof Object) {
                    cloneArray.push(this.cloneDeep(item));
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
                        cloneObject[prop] = this.cloneDeep(source[prop]);
                    }
                    else if (source[prop] instanceof Object) {
                        cloneObject[prop] = this.cloneDeep(source[prop]);
                    }
                    else {
                        cloneObject[prop] = source[prop];
                    }
                }
            }
            return cloneObject;
        }
    };

    getNestedObjectValue = (obj, path) => {
        const deep = path.split('.');
        for (let value of deep) {
            obj = obj[value];
        }
        return obj;
    };

    changeValuePropsChildren = (sourceArray, reactElement = {}, iteratorItem) => {
        const { stringInterpolationIdentifier,
                iteratorKeyIdentifier,
                iteratorKeyGenerator } = this.props;

        if (sourceArray instanceof Array) {
            for (let item of sourceArray) {
                if (item instanceof Array) {
                    this.changeValuePropsChildren(item, {}, iteratorItem);
                }
                else if (React.isValidElement(item)) {
                    if (item.props.iteratorkey !== 'undefined') {
                        if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(item.props.iteratorkey)) {
                            item.props.iteratorkey = iteratorKeyGenerator;
                            item.key = iteratorKeyGenerator;
                        }
                    }
                    this.changeValuePropsChildren(item.props.children, item, iteratorItem);
                }
                else if (typeof item === 'string') {
                    if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(item)) {
                        if (item.split(stringInterpolationIdentifier + '.').length > 1) {
                            sourceArray[sourceArray.indexOf(item)] =
                                this.getNestedObjectValue(iteratorItem, item.split(stringInterpolationIdentifier + '.')[1]);
                        }
                        else {
                            sourceArray[sourceArray.indexOf(item)] = iteratorItem;
                        }
                    }
                    if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(item)) {
                        sourceArray[sourceArray.indexOf(item)] = iteratorKeyGenerator;
                    }
                }
            }
        }
        else {
            if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(sourceArray)) {
                if (sourceArray.split(stringInterpolationIdentifier + '.').length > 1) {
                    sourceArray[sourceArray.indexOf(sourceArray)] =
                        this.getNestedObjectValue(iteratorItem, sourceArray.split(stringInterpolationIdentifier + '.')[1]);
                }
                else {
                    reactElement.props.children = iteratorItem;
                }
            }
            if ( new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(sourceArray)) {
                reactElement.props.children = iteratorKeyGenerator;
            }
        }
    };

    repeatChildren = (source) => {
        const { iterator,
                changeValuePropsChildren } = this;

        if (typeof source === 'undefined') {
            throw new SyntaxError('Please add children inside Repeat');
        }

        return iterator.map((iteratorItem, index) => {
            const cloneArray = this.cloneDeep(source);

            changeValuePropsChildren(cloneArray, {}, iteratorItem);
            return cloneArray;
        });
    };

    render() {
        const { repeatChildren } = this;
        const { children,
                tag,
                className } = this.props;
        const Component = tag;

        return (
            <Component className={className}>
                {
                    repeatChildren(children)
                }
            </Component>
        );
    };
}

RepeatComponent.defaultProps = {
    tag: 'div',
    className: '',
    stringInterpolationIdentifier: '@iterator',
    iteratorKeyIdentifier: '@key',
    iteratorKeyGenerator: new Date().getMilliseconds(),
};

RepeatComponent.propTypes = {
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
