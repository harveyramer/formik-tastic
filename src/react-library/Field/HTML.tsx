import React from 'react';
import { FieldProps } from './types';

const HTML = ({ config }:FieldProps) => {
    const {
        name,
        as: Component = 'div',
        htmlClass,
        htmlString,
        ...attributes
    } = config;
    return (
        <Component className={ htmlClass } { ...attributes }>
            { htmlString }
        </Component>
    );
};

export default React.memo(HTML);
