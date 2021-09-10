import React from "react";
import { changeHandler } from "../utils";
import { FieldProps } from "./types";

const Text = ({ config, formik, value = "", error }: FieldProps) => {
  const {
    name,
    attributes,
    fieldType,
    icon,
    fieldClass = "form-control",
    inputGroupClass = "input-group",
  } = config;
  const { handleChange, handleBlur } = formik;
  const isInputGroup = icon ? true : false;
  return isInputGroup ? (
    <div className={inputGroupClass}>
      <span className="input-group-text">
        <i className={icon}></i>
      </span>
      <input
        id={name}
        name={name}
        type={fieldType}
        className={fieldClass + (error ? " is-invalid " : "")}
        value={value}
        onChange={(data) => changeHandler(handleChange, formik, config, data)}
        onBlur={handleBlur}
        {...attributes}
      />
    </div>
  ) : (
    <input
      id={name}
      name={name}
      type={fieldType}
      className={fieldClass + (error ? " is-invalid " : "")}
      value={value}
      onChange={(data) => changeHandler(handleChange, formik, config, data)}
      onBlur={handleBlur}
      {...attributes}
    />
  );
};

export default React.memo(Text);
