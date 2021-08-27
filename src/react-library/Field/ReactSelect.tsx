import _ from "lodash";
import React, { SyntheticEvent, useState } from "react";
import Select from "react-select";
import { CreatableSelect } from "react-select";
import { changeHandler, setFieldValueWrapper } from "../utils";
import { FieldProps } from "./types";

const prepareOptions = (options: HTMLOptionElement) =>
  _.reduce(
    options,
    (result: any[], value: any) => {
      if (!_.isObject(value) && !_.isEmpty(value)) {
        result.push({ value, label: value });
      } else {
        result.push(value);
      }

      return result;
    },
    []
  );

const getSelectedOptions = (
  options: HTMLOptionElement[],
  values: object | any[],
  isCreatable: boolean
) => {
  const getSelectedOption = (value: any) => {
    const selectedOption = _.filter(options, _.matches({ value }));
    return !_.isEmpty(selectedOption)
      ? selectedOption
      : isCreatable
      ? [{ value, label: value }]
      : null;
  };

  if (values) {
    if (!_.isObject(values)) {
      return getSelectedOption(values);
    }

    return _.reduce(
      values,
      (result: any[], value) => {
        const selectedOption = getSelectedOption(value);
        if (_.isEmpty(selectedOption)) {
          return result;
        }

        return _.union(result, selectedOption);
      },
      []
    );
  }

  return null;
};

const ReactSelect = ({ config, formik, value, error }: FieldProps) => {
  const {
    name,
    isMulti,
    defaultValue,
    fieldClass = "",
    noOptionsMessage,
    isDisabled = false,
    isClearable = false,
    isCreatable = false,
    options: initialOptions,
    ...attributes
  } = config;
  const { setFieldValue, handleBlur } = formik;
  const options = prepareOptions(initialOptions);
  const selectedValue = value || defaultValue;
  const selectedOption = getSelectedOptions(
    options,
    selectedValue,
    isCreatable
  );
  const [inputValue, setInputValue] = useState<string>("");

  var selectProps = {
    name,
    isMulti,
    noOptionsMessage,
    isClearable,
    isDisabled,
    id: name,
    inputValue,
    className: fieldClass + (error ? " is-invalid " : ""),
    onChange: (selectedOptions: HTMLOptionElement | HTMLOptionElement[]) => {
      const selectedValues = !isMulti
        ? (selectedOptions as HTMLOptionElement).value
        : _.reduce(
            selectedOptions as HTMLOptionElement[],
            (result: any[], option) => [...result, option.value],
            []
          );

      return changeHandler(
        setFieldValueWrapper(setFieldValue, name),
        formik,
        config,
        selectedValues
      );
    },
    onBlur: (event: SyntheticEvent) => {
      return handleBlur({
        ...event,
        target: {
          ...event.target,
          name,
        },
      });
    },
    onInputChange: (inputValue: any) => {
      changeHandler(setInputValue, formik, config, inputValue, "onInputChange");
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (
        !isMulti ||
        !inputValue ||
        !selectedValue ||
        selectedValue.indexOf(inputValue) > -1
      ) {
        return;
      }

      switch (event.key) {
        case "Enter":
        case "Tab":
          changeHandler(
            setFieldValueWrapper(setFieldValue, name),
            formik,
            config,
            [...selectedValue, inputValue],
            "onChange"
          );
          setInputValue("");
          event.preventDefault();
      }
    },
    ...attributes,
  };
  selectProps = _.assign(selectProps, { options });

  if (selectedOption) {
    selectProps.value = selectedOption;
  }

  const SelectComponent = isCreatable ? CreatableSelect : Select;
  return <SelectComponent {...selectProps} />;
};

export default React.memo(ReactSelect);
