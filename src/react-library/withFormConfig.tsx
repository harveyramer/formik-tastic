import React from 'react'; 

const SchemaContext = React.createContext({});
type SchemaProviderProps = {
    value: any,
    children:any,
};
export const SchemaProvider = ({ value, children }:SchemaProviderProps) => (
    <SchemaContext.Provider value={ value }>
        { children }
    </SchemaContext.Provider>
);

const withFormConfig = (WrappedComponent:any) => (props: any) => (
    <SchemaContext.Consumer>
        { config => <WrappedComponent { ...props } { ...config } /> }
    </SchemaContext.Consumer>
);

export default withFormConfig
