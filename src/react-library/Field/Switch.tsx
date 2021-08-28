import React from "react";
import { default as ReactSwitch } from "react-switch";
import { changeHandler, setFieldValueWrapper } from "../utils";
import { FieldProps } from "./types";

const Switch = ({ config, formik, value = false, error }: FieldProps) => {
  const {
    name,
    fieldClass = "switch d-block",
  }: { name: string; fieldClass: string } = config;
  const { setFieldValue } = formik;

  return (
    <label className={fieldClass + (error ? " is-invalid " : "")}>
      <ReactSwitch
        checked={value}
        onChange={() => changeHandler(
          setFieldValueWrapper(setFieldValue, name),
          formik,
          config
        ) as any}
      />
    </label>
  );
};

export default React.memo(Switch);
