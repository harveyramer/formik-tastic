import React from 'react';
import { changeHandler } from '../utils';
import { FieldProps } from './types';

const Radio = ({ config, formik, value, error }:FieldProps) => {
    const {
        name,
        type,
        attributes,
        options,
        formCheckClass = 'form-check',
        fieldClass = 'form-check-input',
        formCheckLabelClass = 'form-check-label',
    } = config;
    const { handleChange, handleBlur } = formik;

    return options.map(( option:HTMLOptionElement ) => (
        <div className={ formCheckClass } key={ option.value }>
            <label htmlFor={ name + '_' + option.value } className={ formCheckLabelClass }>
                <input
                    name={ name }
                    type="radio"
                    className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                    id={ name + '_' + option.value }
                    value={ option.value }
                    defaultChecked={ value == option.value }
                    onChange={ event => {
                        changeHandler(handleChange, formik, config, event);
                        handleBlur(event);
                    }}
                    { ...attributes } /> { option.title }
            </label>
        </div>
    ));
}

export default React.memo(Radio);
