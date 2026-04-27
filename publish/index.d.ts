import { PropsWithChildren, ReactNode } from "react";
import * as react_jsx_runtime0 from "react/jsx-runtime";

//#region src/interfaces/Component.d.ts
interface RtSharedProps extends PropsWithChildren {
  tag?: string;
  className?: string;
  useFragment?: boolean;
}
//#endregion
//#region src/Conditional.d.ts
interface ConditionalProps extends RtSharedProps {
  condition?: boolean;
}
declare function Conditional({
  children,
  condition,
  tag,
  className,
  useFragment
}: ConditionalProps): react_jsx_runtime0.JSX.Element;
//#endregion
//#region src/If.d.ts
interface IfProps extends RtSharedProps {
  show?: boolean;
}
declare function If({
  children,
  show,
  tag,
  className,
  useFragment
}: IfProps): false | react_jsx_runtime0.JSX.Element;
//#endregion
//#region src/Else.d.ts
interface ElseProps extends RtSharedProps {
  show?: boolean;
}
declare function Else({
  children,
  show,
  tag,
  className,
  useFragment
}: ElseProps): false | react_jsx_runtime0.JSX.Element;
//#endregion
//#region src/Repeat.d.ts
interface RepeatProps<T> extends Omit<RtSharedProps, 'children'> {
  items: T[];
  children: (item: T) => ReactNode;
}
declare function Repeat({
  items,
  children,
  tag,
  className,
  useFragment
}: RepeatProps<unknown>): react_jsx_runtime0.JSX.Element;
//#endregion
//#region src/Cases.d.ts
interface CaseProps extends RtSharedProps {
  expressionValue: string | number;
}
declare function Case({
  children
}: CaseProps): ReactNode;
interface CasesProps extends RtSharedProps {
  expression: string | number;
  defaultExpressionValue?: string | number;
}
declare function Cases({
  children,
  expression,
  tag,
  className,
  useFragment,
  defaultExpressionValue
}: CasesProps): react_jsx_runtime0.JSX.Element;
//#endregion
export { Case, Cases, Conditional, Else, If, Repeat };