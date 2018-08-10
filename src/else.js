import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Else extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children,
                show,
                tag,
                className } = this.props;
        const Component = tag;

        return (
            show && <Component className={className}>
                {children}
            </Component>
        );
    };
}

Else.defaultProps = {
    show: true,
    tag: 'div',
    className: '',
};

Else.propTypes = {
    show: PropTypes.bool,
    tag: PropTypes.string,
    className: PropTypes.string,
};
