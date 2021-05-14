import React from "react";
import { InputNumber } from "antd";
import lodash from "lodash";
import { FormGroup } from "@dontloop/admin-ui";

interface IFormikInputNumberFormGroupProps {
  required?: boolean;
  fm: any;
  name: string;
  label: string;
  min?: number;
}

const Component: React.FunctionComponent<IFormikInputNumberFormGroupProps> = ({
  fm,
  name,
  label,
  required,
  ...props
}) => {
  console.log("Rendering from InputNumber");

  return (
    <FormGroup
      label={label}
      error={fm.errors[name]}
      touched={fm.touched[name]}
      required={required}
    >
      <InputNumber
        style={{ width: "100%" }}
        name={name}
        value={fm.values[name]}
        onBlur={fm.handleBlur}
        onChange={(value) => {
          fm.setFieldValue(name, value);
        }}
        {...props}
      />
    </FormGroup>
  );
};

export const FormikInputNumberFormGroup = React.memo(
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
