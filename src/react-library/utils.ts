import _ from 'lodash';
import when from '@flipbyte/when-condition';
import { FIELD } from './registry';
import { FormikProps } from 'formik';
import { Indexable } from './types';
import { SyntheticEvent } from 'react';

export const setFieldValueWrapper = (setFieldValue: Function, name: string) => (value: any) => setFieldValue(name, value);
export const joinNames = (...args: any[]) => _.join(_.filter(args, arg => (_.isString(arg) && arg) || _.isInteger(arg)), '.')
export const getName = (type: string, name: string, ...args: any[]) => type === FIELD && !name ? null : joinNames(...args, name);

/**
 * Handle Change and trigger callback if provided
 *
 * @param  {function} handler
 * @param  {object} formikProps
 * @param  {object} config
 * @param  {object} data
 * @param  {string} key
 * @return {void}
 */
export const changeHandler = (handler: ((data: any) => void), formikProps: FormikProps<any>, config: any, data?: any, key = 'onChange') => {
    handler(data);
    _.isFunction(config[key]) && config[key](formikProps, config, data);
};

/**
 * Recurively prepare a complete validation schema array for yup-schema from individual
 * validation arrays passed to fields
 *
 * @param  {array} schema
 * @return {array}
 */
export const prepareValidationSchema = (schema: Indexable): any => {
    const { type, elements, name, renderer, validation, prefixNameToElement = false } = schema;
    if (type === FIELD && validation) {
        return {
            [name]: validation
        };
    }

    const elementSchema = _.reduce(elements, (result: Indexable = { }, element, key) => {
        return {
            ...result,
            ...prepareValidationSchema(element)
        };
    }, { });

    let result: Indexable = { };
    if (renderer === 'editable-grid' && !_.isEmpty(elementSchema)) {
        result[name] = [['array', [['object', elementSchema]]]];
    } else if (!_.isEmpty(elementSchema) && name) {
        result[name] = [['object', elementSchema]];
    } else {
        result = { ...result, ...elementSchema };
    }

    return result;
};
