import React from 'react';
import PropTypes from 'prop-types';
import { Props } from "./interfaces/component";

export default function If(props: Props) {
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
