import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ConditionalComponent from "./conditional.component";

export default class IfComponent extends Component {

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

IfComponent.defaultProps = {
    show: true,
    tag: 'div',
    className: '',
};

IfComponent.propTypes = {
    show: PropTypes.bool,
    tag: PropTypes.string,
    className: PropTypes.string,
};
