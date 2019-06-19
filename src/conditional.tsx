import React from 'react';
import PropTypes from 'prop-types';
import { Props } from "./interfaces/component";

export default function Conditional(props: Props) {
    const { children,
            condition,
            tag,
            className } = props;

    const Component = tag;

    if (React.Children.count(children) < 2) {
        throw new SyntaxError('You must include an If component and an Else component');
    }

    return (
        <Component className={className}>
            {
                condition ? children[0] : children[1]
            }
        </Component>
    );
}

Conditional.defaultProps = {
    condition: true,
    tag: 'div',
    className: ''
};

Conditional.propTypes = {
    condition: PropTypes.bool.isRequired,
    tag: PropTypes.string,
    className: PropTypes.string
};
