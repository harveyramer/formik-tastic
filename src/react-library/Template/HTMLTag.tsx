import {
  ErrorInfo,
  Fragment,
  JSXElementConstructor,
  ReactElement,
} from "react";

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
const HTMLTag = ({
  children,
}: TemplateProps) => {
  const Component = Fragment;

  return (
    <Component>
        {children}
    </Component>
  );
};

export default HTMLTag;
