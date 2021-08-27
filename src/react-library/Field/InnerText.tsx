import React from 'react';
import { FieldProps } from './types';

const InnerText = ({ config, formik, value, error }:FieldProps) => {
    const {
        name,
        as: Component = 'span',
        htmlClass,
        defaultValue = '',
        ...attributes
    } = config;

    return (
        <Component className={ htmlClass } { ...attributes }>
            { value || defaultValue }
        </Component>
    );
};

export default React.memo(InnerText);
