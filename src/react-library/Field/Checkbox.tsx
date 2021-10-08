import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { changeHandler } from "../utils";
import { FieldProps } from "./types";
import { Indexable } from "../types";

interface OptionWithComment extends Indexable {
  comment: string;
  commentClass: string;
}

const Checkbox = ({ config, formik, value, error }: FieldProps) => {
  const {
    name,
    attributes,
    options = [],
    formCheckClass = "form-check",
    fieldClass = "form-check-input",
    formCheckLabelClass = "form-check-label",
  } = config;
  const { handleChange, setFieldTouched } = formik;
  return options.map(
    (
      {
        value: val,
        label,
        comment,
        commentClass = "d-block",
      }: OptionWithComment,
      key: string,
      index: number
    ) => {
      const fieldId = _.kebabCase(name + " " + val);
      const fieldValue = `${val}`;
      const isChecked = value?.includes(val);
      return (
        <div
          key={key}
          className={formCheckClass + (error ? " is-invalid " : "")}
        >
          <label htmlFor={fieldId} className={formCheckLabelClass}>
            {label}
          </label>
          <input
            id={fieldId}
            name={`${name}`}
            value={fieldValue}
            className={fieldClass + (error ? " is-invalid " : "")}
            type="checkbox"
            checked={isChecked}
            onChange={(event) => {
              changeHandler(handleChange, formik, config, event);
            }}
            {...attributes}
          />{" "}
          {comment && <small className={commentClass}>{comment}</small>}
        </div>
      );
    }
  );
};

Checkbox.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    formCheckClass: PropTypes.string,
  }),
};

export default React.memo(Checkbox);
