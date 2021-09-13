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
  const { handleChange, handleBlur } = formik;
  return options.map(
    ({ value:val, label, comment, commentClass = 'd-block' }: OptionWithComment, key: string, index: number) => {
      const fieldName = _.kebabCase(name + " " + val);
      const fieldValue = `${val}:${label}`;
      const isChecked = value && value[key]?.length;
      return (
        <div key={key} className={formCheckClass}>
          <label htmlFor={fieldName} className={formCheckLabelClass}>
            <input
              id={fieldName}
              name={`${name}.${key}`}
              value={fieldValue}
              className={fieldClass + (error ? " is-invalid " : "")}
              type="checkbox"
              checked={isChecked}
              onChange={(event) => {
                changeHandler(handleChange, formik, config, event);
                handleBlur(event);
              }}
              {...attributes}
            />{" "}
            {label} {comment && <small className={commentClass}>{comment}</small>}
          </label>
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
