import React, {
  ErrorInfo,
  Fragment,
  JSXElementConstructor,
  ReactElement,
} from "react";
import Label from "../Field/Label";
import ErrorMessage from "../Field/ErrorMessage";

const styles = (disabled: boolean) =>
  disabled ? { pointerEvents: "none", opacity: 0.6 } : {};
type TemplateProps = {
  disabled: boolean;
  name: string;
  label:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactElement<any, string | JSXElementConstructor<any>>[];
  comment: string;
  error: ErrorInfo;
  labelClass: string;
  wrapAs: string;
  htmlClass: string;
  commentClass: string;
  commentAs: string;
  errorClass: string;
  errorAs: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>[];
};
const Default = ({
  disabled = false,
  name,
  label,
  comment,
  error,
  labelClass = "form-label",
  wrapAs = "div",
  htmlClass = "mb-4",
  commentClass = "text-muted order-last",
  commentAs: CommentComponent = "small",
  errorClass,
  errorAs,
  children,
}: TemplateProps) => {
  const Component = !wrapAs ? Fragment : wrapAs;
  const componentProps = !wrapAs
    ? {}
    : {
        className: htmlClass,
        style: styles(disabled),
      };

  return (
    <Component {...componentProps}>
        {label && (
          <Label htmlFor={name} className={labelClass}>
            {label}
          </Label>
        )}
        {children}
        {comment &&
          React.createElement(
            CommentComponent,
            { className: commentClass },
            <>{comment}</>
          )}
        <ErrorMessage
          name={name}
          error={error}
          className={errorClass}
          as={errorAs}
        />
    </Component>
  );
};

export default Default;
