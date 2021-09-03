import React from "react";
import { changeHandler } from "../utils";
import { FieldProps } from "./types";

const File = ({ config, formik, value = "", error }: FieldProps) => {
  const {
    name,
    options,
    attributes,
    fieldType,
    defaultValue,
    icon,
    fieldClass = "form-control",
    inputGroupClass = "input-group",
  } = config;

  const { handleChange, handleBlur, setFieldValue } = formik;
  const isInputGroup = icon ? true : false;
  const prepareFileUploderOptions = (
    { onChange, ...options }: any,
    formik: any,
    config: any
  ) => {
    options.onChange = onChange
      ? onChange.bind(this, formik, config)
      : (event: Event) => {
        setFieldValue(name, Array.from((event.target as any).files as File[]).map((f:File) => f.name));
      };
    return options;
  };
  const opts = {  ...prepareFileUploderOptions({ ...options }, formik, config)};
  return isInputGroup ? (
    <div className={inputGroupClass}>
      <span className="input-group-text">
        <i className={icon}></i>
      </span>
      <input
        id={name}
        name={name}
        type="file"
        className={fieldClass + (error ? " is-invalid " : "")}
        onBlur={handleBlur}
        {...opts}
        {...attributes}
      />
    </div>
  ) : (
    <input
      id={name}
      name={name}
      type="file"
      className={fieldClass + (error ? " is-invalid " : "")}
      onBlur={handleBlur}
      {...opts}
      {...attributes}
    />
  );
};

export default React.memo(File);
