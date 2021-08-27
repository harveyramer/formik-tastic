import React, { ReactElement } from 'react';

const Label = ({ children, ...attributes }:{children: ReactElement | ReactElement[], htmlFor?:string, className?: string}) => children ? <label { ...attributes }>{ children }</label> : null;

export default React.memo(Label);
