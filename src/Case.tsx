import React, { Fragment } from "react";
import { Props } from "./interfaces/Component";

interface ICaseProps extends Props {
  expressionValue: any;
}

const Case = ({ children }: ICaseProps) => children;

export default Case;
