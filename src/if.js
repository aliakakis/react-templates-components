import React from 'react';
import PropTypes from 'prop-types';

export default function If(props) {
    const { children,
            show,
            tag,
            className } = props;

    const Component = tag;

    return (
        show && <Component className={className}>
            {children}
        </Component>
    );
}

If.defaultProps = {
    show: true,
    tag: 'div',
    className: ''
};

If.propTypes = {
    show: PropTypes.bool,
    tag: PropTypes.string,
    className: PropTypes.string
};
