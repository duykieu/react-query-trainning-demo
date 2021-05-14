import React from "react";
import { Input } from "antd";
import FormGroup from "@dontloop/admin-ui/src/components/FormGroup";

interface IFormikFormTextAreaProps {
  required?: boolean;
  fm: any;
  name: string;
  rows?: number;
  label: string;
}

export const FormikFormTextArea: React.FunctionComponent<IFormikFormTextAreaProps> = ({
  fm,
  name,
  label,
  required,
  rows = undefined,
}) => (
  <FormGroup
    label={label}
    error={fm.errors[name]}
    touched={fm.touched[name]}
    required={required}
  >
    <Input.TextArea
      name={name}
      value={fm.values[name]}
      onBlur={fm.handleBlur}
      onChange={fm.handleChange}
      rows={rows}
    />
  </FormGroup>
);
