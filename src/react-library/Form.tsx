import _ from "lodash";
import React, {
  useEffect,
  useCallback,
  useState,
  RefObject,
  ReactNode,
  ForwardedRef,
  MutableRefObject,
  PropsWithChildren,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import {
  Formik,
  FormikProps,
  FormikValues,
  FormikFormProps,
  FormikHelpers,
} from "formik";
import Element from "./Element";
import { SchemaProvider } from "./withFormConfig";
import { prepareValidationSchema } from "./utils";
import Rules from "@flipbyte/yup-schema";

export type FormInitProps = {
  onUpdate?: (values: any, formikHelpers?: FormikHelpers<any>) => void;
  onSubmit: (
    values: any,
    formikHelpers?: FormikHelpers<any>
  ) => void | Promise<any>;
  schema: any;
  values?: any[];
  initialValues?: any;
  onReset?: (values: any, formikHelpers?: FormikHelpers<any>) => void;
  className?: string;
  validationSchema?: any;
};

const FormikForm = ({ onUpdate, schema, ...formik }: FormInitProps) => {
  /**
   * Callback if provided will be vcalled when form values change
   */
  useEffect(() => {
    if (typeof onUpdate === "function") {
      onUpdate(formik);
    }
  }, [formik.values]);
  return <Element config={schema} />;
};

const Form = React.forwardRef<Element, FormInitProps>(
  (
    { schema, onUpdate = () => {}, initialValues = {}, ...rest }: any,
    ref: any
  ) => {
    const [validationSchema, setValidationSchema] = useState(null);

    /**
     * Initialize validation schema.
     *
     * Convert the validation schema rules from yup-schema array to yup object
     */
    const initValidationSchema = useCallback(() => {
      const yupSchema = prepareValidationSchema(schema);
      const validationSchema = !_.isEmpty(yupSchema)
        ? new Rules([["object", yupSchema]]).toYup()
        : null;
      setValidationSchema(validationSchema);
    }, [schema]);

    /**
     * Everytime the schema changes, re-initialize validationSchema
     *
     * This is has to be done everytime schema changes because,
     * certain cases may involve dynamically changing form fields based on
     * certain conditions, routes etc.
     */
    useEffect(() => {
      initValidationSchema();
    }, [schema]);

    const formProps = { ...rest, initialValues };
    if (null !== validationSchema) {
      formProps.validationSchema = validationSchema;
    }

    return (
      <SchemaProvider value={{ validationSchema, schema }}>
        <Formik {...formProps} innerRef={ref}>
          {(props: FormInitProps) => (
            <FormikForm {...props} schema={schema} onUpdate={onUpdate} />
          )}
        </Formik>
      </SchemaProvider>
    );
  }
);

export default Form;
