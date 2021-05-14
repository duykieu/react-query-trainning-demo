import React from "react";
import { Input } from "antd";
import lodash from "lodash";
import { LiteralUnion } from "antd/lib/_util/type";
import { FormGroup } from "@dontloop/admin-ui";

interface IFormikInputFormGroupProps {
  required?: boolean;
  fm: any;
  name: string;
  label: string;
  onPressEnter?: any;
  helper?: string;
  type?: LiteralUnion<
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week",
    string
  >;
}

const Component: React.FunctionComponent<IFormikInputFormGroupProps> = ({
  fm,
  name,
  label,
  required,
  helper,
  ...props
}) => {
  return (
    <FormGroup
      label={label}
      error={fm.errors[name]}
      touched={fm.touched[name]}
      required={required}
    >
      <Input
        {...props}
        name={name}
        value={fm.values[name]}
        onBlur={fm.handleBlur}
        onChange={fm.handleChange}
      />
      {helper && (
        <div className="helper" style={{ fontSize: "12px", color: "#ccc" }}>
          {helper}
        </div>
      )}
    </FormGroup>
  );
};

export const FormikInputFormGroup = React.memo(
  Component,
  (prevProps, nextProps) => {
    const { name } = prevProps;
    return (
      lodash.isEqual(prevProps.fm.values[name], nextProps.fm.values[name]) &&
      lodash.isEqual(prevProps.fm.errors[name], nextProps.fm.errors[name]) &&
      lodash.isEqual(prevProps.fm.touched[name], nextProps.fm.touched[name])
    );
  }
);
