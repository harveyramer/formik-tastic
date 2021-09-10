import React from 'react';
import { ErrorInfo } from 'react';

const ErrorMessage = ({
    name,
    error,
    className = 'invalid-feedback order-last',
    as: Component = 'div'
}: {
    name: string,
    error: ErrorInfo,
    className: string,
    as: any,
}) => error && (
    <Component className={ className }>{ error }</Component>
);

export default React.memo(ErrorMessage);
