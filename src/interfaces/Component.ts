import { IObject } from "./Object";

export interface IProps extends IObject {
    children?: any;
    tag?: string;
    className?: string;
    useFragment?: boolean;
}
