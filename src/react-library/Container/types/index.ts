import { FormikProps } from "formik";
import { ReactElement, ReactNode } from "react";

export type HTMLElementConfig = {
  name: string,
  as: string,
  elements: any[],
  htmlClass: string,
  comment: string,
  commentClass: string,
};
export type HTMLTagProps = {
  config: HTMLElementConfig,
  children: ReactNode
};

export type FieldsetProps = {
  config: {
    name: string,
    title: string,
    elements: any[],
    collapsible: boolean,
    collapsed: boolean,
    hasHeaderIcon: boolean,
    comment: string,
    commentClass: string,
    headerIconClass: string,
    cardClass: string,
    cardHeaderClass: string,
    cardHeaderIconCollapsedClass: string,
    cardHeaderIconDisclosedClass: string,
    cardHeaderActionsClass: string,
    cardBodyClass: string
  }
};

export type ButtonGroupProps = {
  config: {
    elements: any[],
    buttonsContainerClass: string,
    buttonGroupClass: string,
  }
};

export type EditableGridProps = {
  config: TableRowProps & {
    name: string,
    comment: string,
    commentClass: string,
    tableContainerClass: string,
    tableClass: string
  },
  formik: FormikProps<any>
};

export type TableRowProps = {
  fieldArrayName: string,
  elements: any[],
  arrayActions: any,
  rowIndex?: number,
  buttons: any,
  isSortable?: boolean,
  value?: any,
  isObject?: boolean,
  index?: number,
};

export type TableBodyProps = TableRowProps & {
  hasValue: boolean,
  arrayValues: any[],
};