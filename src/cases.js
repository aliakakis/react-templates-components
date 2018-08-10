import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';

export class Case extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

Case.propTypes = {
    expressionValue: PropTypes.any.isRequired,
};

export default class Cases extends Component {

    constructor(props) {
        super(props);

        const { children } = props;

        if (React.Children.count(children) < 2) {
            throw new SyntaxError('You must include at least two cases with one marked as default');
        }
    }

    render() {
        const { children,
                condition,
                expression,
                tag,
                className } = this.props;
        const Component = tag;

        let CaseItem = null;

        if (React.Children.count(children) > 2) {
            let filteredArrayElement = children.filter((childItem) => {
                return childItem.props.expressionValue === expression;
            });
            if (filteredArrayElement.length === 0) {
                CaseItem = children[children.length - 1];
            }
            else if (filteredArrayElement.length > 1) {
                throw new SyntaxError('You most probably have set the same expressionValue in your Case components');
            }
            else {
                CaseItem = filteredArrayElement;
            }
        }
        return (
            <Component className={className}>
                {
                    React.Children.count(children) > 2 ?
                        CaseItem :
                        condition ? children[0] : children[1]
                }
            </Component>
        );
    };
}

Cases.defaultProps = {
    tag: 'div',
    className: '',
};

Cases.propTypes = {
    expression: PropTypes.any.isRequired,
    tag: PropTypes.string,
    className: PropTypes.string,
};
