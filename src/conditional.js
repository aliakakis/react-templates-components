import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Conditional extends Component {

    constructor(props) {
        super(props);

        const { children } = props;

        if (React.Children.count(children) < 2) {
            throw new SyntaxError('You must include an If component and an Else component');
        }
    }

    render() {
        const { children,
                condition,
                tag,
                className } = this.props;
        const Component = tag;

        return (
            <Component className={className}>
                {
                    condition ? children[0] : children[1]
                }
            </Component>
        );
    };
}

Conditional.defaultProps = {
    condition: true,
    tag: 'div',
    className: '',
};

Conditional.propTypes = {
    condition: PropTypes.bool.isRequired,
    tag: PropTypes.string,
    className: PropTypes.string,
};
