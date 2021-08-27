import { Component, ErrorInfo, MouseEventHandler } from "react";

export type FieldProps = {
  config?: any,
  formik?: any,
  value?: any,
  error?: ErrorInfo
}
export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type?: "button" | "submit" | "reset",
  className?: string,
  disabled?: boolean
}