import React from "react";
import { Form, Radio } from "antd";

interface RadioOption {
  label: string;
  value: string;
  checked: boolean;
}

interface RadioFormFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  rules?: any[];
}

export const RadioFormField: React.FC<RadioFormFieldProps> = ({
  name,
  label,
  options,
  rules,
}) => {
  // Find the initially checked option
  const defaultCheckedValue = options.find((option) => option.checked)?.value;

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Radio.Group defaultValue={defaultCheckedValue}>
        {options.map((option) => (
          <Radio value={option.value} key={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
