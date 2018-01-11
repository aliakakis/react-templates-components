'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepeatComponent = (_temp = _class = function (_Component) {
    _inherits(RepeatComponent, _Component);

    function RepeatComponent(props) {
        _classCallCheck(this, RepeatComponent);

        var _this = _possibleConstructorReturn(this, (RepeatComponent.__proto__ || Object.getPrototypeOf(RepeatComponent)).call(this, props));

        _initialiseProps.call(_this);

        var iterator = props.iterator;


        if (typeof iterator === 'undefined') {
            throw new SyntaxError('The iterator prop is mandatory');
        }

        _this.iterator = typeof iterator === 'number' ? [].concat(_toConsumableArray(new Array(iterator))) : iterator;
        return _this;
    }

    _createClass(RepeatComponent, [{
        key: 'render',
        value: function render() {
            var repeatChildren = this.repeatChildren;
            var _props = this.props,
                children = _props.children,
                tag = _props.tag,
                className = _props.className;

            var Component = tag;

            return _jsx(Component, {
                className: className
            }, void 0, repeatChildren(children));
        }
    }]);

    return RepeatComponent;
}(_react.Component), _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.cloneDeep = function (source) {
        if (source instanceof Array) {
            var cloneArray = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (item instanceof Array) {
                        cloneArray.push(_this2.cloneDeep(item));
                    } else if (item instanceof Object) {
                        cloneArray.push(_this2.cloneDeep(item));
                    } else {
                        cloneArray.push(item);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return cloneArray;
        } else if (source instanceof Object) {
            var cloneObject = {};
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    if (source[prop] instanceof Array) {
                        cloneObject[prop] = _this2.cloneDeep(source[prop]);
                    } else if (source[prop] instanceof Object) {
                        cloneObject[prop] = _this2.cloneDeep(source[prop]);
                    } else {
                        cloneObject[prop] = source[prop];
                    }
                }
            }
            return cloneObject;
        }
    };

    this.getNestedObjectValue = function (obj, path) {
        var deep = path.split('.');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = deep[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;

                obj = obj[value];
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return obj;
    };

    this.changeValuePropsChildren = function (sourceArray) {
        var reactElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var iteratorItem = arguments[2];
        var _props2 = _this2.props,
            stringInterpolationIdentifier = _props2.stringInterpolationIdentifier,
            iteratorKeyIdentifier = _props2.iteratorKeyIdentifier,
            iteratorKeyGenerator = _props2.iteratorKeyGenerator;


        if (sourceArray instanceof Array) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = sourceArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    if (item instanceof Array) {
                        _this2.changeValuePropsChildren(item, {}, iteratorItem);
                    } else if (_react2.default.isValidElement(item)) {
                        item.key = new Date().getMilliseconds();
                        if (item.props.iteratorkey !== 'undefined') {
                            if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(item.props.iteratorkey)) {
                                item.props.iteratorkey = typeof iteratorKeyGenerator === 'undefined' ? new Date().getMilliseconds() : iteratorKeyGenerator;
                                item.key = typeof iteratorKeyGenerator === 'undefined' ? new Date().getMilliseconds() : iteratorKeyGenerator;
                            }
                        }
                        _this2.changeValuePropsChildren(item.props.children, item, iteratorItem);
                    } else if (typeof item === 'string') {
                        if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(item)) {
                            if (item.split(stringInterpolationIdentifier + '.').length > 1) {
                                sourceArray[sourceArray.indexOf(item)] = _this2.getNestedObjectValue(iteratorItem, item.split(stringInterpolationIdentifier + '.')[1]);
                            } else {
                                sourceArray[sourceArray.indexOf(item)] = iteratorItem;
                            }
                        }
                        if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(item)) {
                            sourceArray[sourceArray.indexOf(item)] = typeof iteratorKeyGenerator === 'undefined' ? new Date().getMilliseconds() : iteratorKeyGenerator;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        } else {
            if (new RegExp('(' + stringInterpolationIdentifier + ')', 'g').test(sourceArray)) {
                if (sourceArray.split(stringInterpolationIdentifier + '.').length > 1) {
                    sourceArray[sourceArray.indexOf(sourceArray)] = _this2.getNestedObjectValue(iteratorItem, sourceArray.split(stringInterpolationIdentifier + '.')[1]);
                } else {
                    reactElement.props.children = iteratorItem;
                }
            }
            if (new RegExp('(' + iteratorKeyIdentifier + ')', 'g').test(sourceArray)) {
                reactElement.props.children = typeof iteratorKeyGenerator === 'undefined' ? new Date().getMilliseconds() : iteratorKeyGenerator;
            }
        }
    };

    this.repeatChildren = function (source) {
        var iterator = _this2.iterator,
            changeValuePropsChildren = _this2.changeValuePropsChildren;


        if (typeof source === 'undefined') {
            throw new SyntaxError('Please add children inside Repeat');
        }

        return iterator.map(function (iteratorItem, index) {
            var cloneArray = _this2.cloneDeep(source);

            changeValuePropsChildren(cloneArray, {}, iteratorItem);
            return cloneArray;
        });
    };
}, _temp);
exports.default = RepeatComponent;


RepeatComponent.defaultProps = {
    tag: 'div',
    className: '',
    stringInterpolationIdentifier: '@iterator',
    iteratorKeyIdentifier: '@key'
};

RepeatComponent.propTypes = {
    iterator: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.number]).isRequired,
    tag: _propTypes2.default.string,
    className: _propTypes2.default.string,
    stringInterpolationIdentifier: _propTypes2.default.string,
    iteratorKeyIdentifier: _propTypes2.default.string,
    iteratorKeyGenerator: _propTypes2.default.any
};