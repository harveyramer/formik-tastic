import _ from "lodash";
import React, { Component, SyntheticEvent } from "react";
import { ComponentProps } from "react";
import Autosuggest from "react-autosuggest";
import { changeHandler, setFieldValueWrapper } from "../utils";
import { FieldProps } from "./types";
// import '../css/autocomplete.css';

class Autocomplete extends Component {
  private autosuggestOptions: any;
  private callbacks: any;
  private inputClassName: string = "";
  static autosuggestCallbackKeys = [
    "onSuggestionsFetchRequested",
    "onSuggestionsClearRequested",
    "getSuggestionValue",
    "renderSuggestion",
    "onSuggestionSelected",
    "onSuggestionHighlighted",
    "shouldRenderSuggestions",
    "renderSectionTitle",
    "getSectionSuggestions",
    "renderInputComponent",
    "renderSuggestionsContainer",
  ];

  constructor(props: ComponentProps<any>) {
    super(props);
    const { initialSuggestions = [] } = props;
    this.state = { suggestions: initialSuggestions };
    this.initOptions();
  }

  initOptions() {
    this.prepareCallbacks();
    this.autosuggestOptions = _.assign(
      { inputProps: {} },
      (this.props as any).config.options,
      this.callbacks
    );
    this.inputClassName =
      this.autosuggestOptions.inputProps.className ||
      "react-autosuggest__input";
  }

  prepareCallbacks() {
    const { formik, config } = this.props as any;
    const stateUpdater = this.setState.bind(this);

    this.callbacks = _.reduce(
      Autocomplete.autosuggestCallbackKeys,
      (callbacks: any, key) => {
        if (_.isFunction(config.options[key])) {
          callbacks[key] = config.options[key].bind(this, formik, config, {
            stateUpdater,
          });
        }
        return callbacks;
      },
      {}
    );
  }

  render() {
    const { config, formik, error, value } = this.props as FieldProps;
    const { name } = config;
    const { setFieldValue, handleBlur } = formik;

    this.autosuggestOptions.inputProps.name = name;
    this.autosuggestOptions.inputProps.value = value || "";
    this.autosuggestOptions.inputProps.onChange = (
      event: SyntheticEvent,
      { newValue, method }: { newValue: any; method: any }
    ) =>
      changeHandler(
        setFieldValueWrapper(setFieldValue, name),
        formik,
        config,
        newValue
      );
    this.autosuggestOptions.inputProps.onBlur = handleBlur.bind(this);
    this.autosuggestOptions.inputProps.className =
      this.inputClassName + (error ? " is-invalid " : "");

    return (
      <Autosuggest
        suggestions={(this.state as any).suggestions}
        {...this.autosuggestOptions}
      />
    );
  }
}

export default React.memo(Autocomplete);
