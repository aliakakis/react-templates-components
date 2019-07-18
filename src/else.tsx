import React from 'react';
import PropTypes from 'prop-types';
import { Props } from "./interfaces/component";

export default function Else(props: Props) {
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

Else.defaultProps = {
    show: true,
    tag: 'div',
    className: ''
};

Else.propTypes = {
    show: PropTypes.bool,
    tag: PropTypes.string,
    className: PropTypes.string
};
