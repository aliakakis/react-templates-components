import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class If extends Component {

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

If.defaultProps = {
    show: true,
    tag: 'div',
    className: '',
};

If.propTypes = {
    show: PropTypes.bool,
    tag: PropTypes.string,
    className: PropTypes.string,
};
