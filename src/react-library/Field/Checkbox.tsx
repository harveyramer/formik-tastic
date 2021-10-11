import _ from "lodash";
import React, { DOMElement, useEffect } from "react";
import PropTypes from "prop-types";
import { changeHandler } from "../utils";
import { FieldProps } from "./types";
import { Indexable } from "../types";
import CheckboxItem from "./components/CheckboxItem";
import { FieldArray } from "formik";

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

  return (
    <FieldArray name={name}>
      {({ form, ...fieldArrayHelpers }) => {
        return options.map(
          (
            {
              value: val,
              label,
              comment,
              commentClass = "d-block",
            }: OptionWithComment,
            key: number
          ) => {
            const fieldId = _.kebabCase(name + " " + val);
            const fieldValue = `${val}`;
            const isChecked = value?.some((v:any) => v === val);

            return (
              <div
                key={key}
                className={formCheckClass + (error ? " is-invalid " : "")}
              >
                <label htmlFor={fieldId} className={formCheckLabelClass}>
                  {label}
                </label>
                <CheckboxItem
                  id={fieldId}
                  index={key}
                  name={name}
                  value={fieldValue}
                  checked={isChecked}
                  className={fieldClass + (error ? " is-invalid " : "")}
                  handleChange={(target: HTMLInputElement) => {
                    if (!target.checked) {
                      const parts = name.split('.');
                      const checkboxVals = parts.reduce((acc:any, current:string) => {
                          return acc[current] ? acc[current]: acc;
                      }, form?.values);
                      const checkedTotal = checkboxVals.reduce((count:number, v:string) => v ? ++count : count, 0);
                      console.log(checkedTotal, checkboxVals);
                      if (checkedTotal === 1) {
                        form.setFieldValue(name, []);
                      } else {
                        const idx = checkboxVals.indexOf(target.value);
                        fieldArrayHelpers.replace(idx, undefined);
                      }
                    } else {
                      if (!value) {
                        for (let i:number = 0; i < options.length; i++){
                          fieldArrayHelpers.push(undefined);
                        }
                      }
                      fieldArrayHelpers.replace(key, fieldValue);
                    }
                  }}
                />
                {comment && <small className={commentClass}>{comment}</small>}
              </div>
            );
          }
        );
      }}
    </FieldArray>
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
