import { Component, ErrorInfo, MouseEventHandler } from "react";

interface Indexable {
  [key: string]: unknown
}

export type FieldProps = {
  config?: any,
  formik?: any,
  value?: any | Indexable,
  error?: ErrorInfo
}
export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type?: "button" | "submit" | "reset",
  className?: string,
  disabled?: boolean
}