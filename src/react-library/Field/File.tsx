import React from "react";
import { changeHandler } from "../utils";
import { FieldProps } from "./types";

const File = ({ config, formik, value = "", error }: FieldProps) => {
  const {
    name,
    type,
    attributes,
    fieldType,
    defaultValue,
    icon,
    fieldClass = "form-control",
    inputGroupClass = "input-group",
  } = config;

  const { handleChange, handleBlur, setFieldValue } = formik;
  const isInputGroup = icon ? true : false;

  return isInputGroup ? (
    <div className={inputGroupClass}>
      <span className="input-group-File">
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
      type="file"
      className={fieldClass + (error ? " is-invalid " : "")}
      value={value}
      onChange={(event:Event) => {
        setFieldValue(name, (event.currentTarget as any).files[0]);
      }}
      onBlur={handleBlur}
      {...attributes}
    />
  );
};

export default React.memo(File);
