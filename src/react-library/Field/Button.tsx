import React from 'react';
import { ButtonProps, FieldProps } from './types';

const Button = ({ config, formik }:FieldProps) => {
    const { content, fieldClass, buttonType, onClick } = config;
    const { isSubmitting } = formik;

    let buttonProps:ButtonProps = {
        type: buttonType ? buttonType : 'button' ,
        className: 'btn ' + fieldClass,
        disabled: isSubmitting
    };

    if(typeof onClick === 'function') {
        buttonProps.onClick = onClick.bind(this, formik, config);
    }

    return (
        <button { ...buttonProps }>
            { content } { buttonType === 'submit' && isSubmitting && <i className="fa fa-spinner fa-spin" /> }
        </button>
    );
}

export default Button;
