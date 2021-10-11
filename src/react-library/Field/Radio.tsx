import React from "react";
import { changeHandler } from "../utils";
import { FieldProps } from "./types";

interface OptionWithComment extends HTMLOptionElement {
  comment: string;
  commentClass: string;
}

const Radio = ({ config, formik, value, error }: FieldProps) => {
  const {
    name,
    attributes,
    options,
    formCheckClass = "form-check",
    fieldClass = "form-check-input",
    formCheckLabelClass = "form-check-label",
  } = config;
  const { handleChange } = formik;
  return options.map(({ value:optionValue, label, comment, commentClass = 'd-block' }: OptionWithComment) => (
      <div className={formCheckClass + (error ? " is-invalid " : "")} key={optionValue}>
        <label
          htmlFor={name + "_" + optionValue}
          className={formCheckLabelClass}
        >
          <input
            name={name}
            type="radio"
            className={fieldClass + (error ? " is-invalid " : "")}
            id={name + "_" + optionValue}
            value={optionValue}
            checked={optionValue === value}
            onChange={(event) => {
              changeHandler(handleChange, formik, config, event);
            }}
            {...attributes}
          />{" "}
          {label} {comment && <small className={commentClass}>{comment}</small>}
        </label>
      </div>
    )
  );
};

export default React.memo(Radio);
