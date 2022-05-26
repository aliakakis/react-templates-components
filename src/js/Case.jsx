import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Case = ({ children }) => children;

Case.propTypes = {
  expressionValue: PropTypes.any.isRequired,
};

export default Case;
