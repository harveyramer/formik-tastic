import { isEmpty } from "../utils";
import { ButtonProps, FieldProps } from "./types";

const Button = ({ config, formik }: FieldProps) => {
  const {
    content,
    fieldClass,
    buttonType,
    onClick,
    validationErrorClass = "text-danger d-block",
    validationErrorMessage = "Some fields are not valid.",
    disableOnInvalid = false,
    showErrorOnInvalid = true,
  } = config;
  const { isSubmitting, isValid, errors } = formik;

  let buttonProps: ButtonProps = {
    type: buttonType ? buttonType : "button",
    className: "btn " + fieldClass,
    disabled: disableOnInvalid ? isSubmitting || (!isValid && !isEmpty(errors)) : isSubmitting,
  };

  if (typeof onClick === "function") {
    buttonProps.onClick = () => onClick(formik, config);
  }
  return (
    <>
      {showErrorOnInvalid && !isValid && !isEmpty(errors) && (
        <small className={validationErrorClass}>
          {validationErrorMessage}
        </small>
      )}
      <button {...buttonProps}>
        {content}{" "}
        {buttonType === "submit" && isSubmitting && (
          <i className="fa fa-spinner fa-spin" />
        )}
      </button>
    </>
  );
};

export default Button;
