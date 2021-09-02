import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { changeHandler, setFieldValueWrapper } from "../utils";
import { FieldProps } from "./types";

import "codemirror/lib/codemirror.css";

const CodeEditor = ({ config, formik, value, error }: FieldProps) => {
  const { name, options, attributes, fieldClass = "" } = config;
  const { setFieldValue, handleBlur } = formik;
  const selectedValue = value || "";
  const mode: 'xml' | 'javascript' | 'css' | 'htmlmixed' = options?.mode ? options.mode : "xml";
  switch (mode) {
    case "xml":
      require("codemirror/mode/xml/xml");
      break;
    case "javascript":
      require("codemirror/mode/javascript/javascript");
      break;
    case "css":
      require("codemirror/mode/css/css");
      break;
    case "htmlmixed":
      require("codemirror/mode/htmlmixed/htmlmixed");
      break;
  }
  return (
    <CodeMirror
      id={name}
      name={name}
      options={options}
      className={fieldClass + (error ? " is-invalid " : "")}
      onBeforeChange={(editor, data, value) => {
        changeHandler(
          setFieldValueWrapper(setFieldValue, name),
          formik,
          config,
          value
        );
      }}
      onBlur={(editor, event) => {
        return handleBlur({
          ...event,
          target: {
            ...event.target,
            name,
          },
        });
      }}
      value={selectedValue}
      {...attributes}
    />
  );
};

export default React.memo(CodeEditor);
