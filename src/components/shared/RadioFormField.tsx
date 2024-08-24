import React from 'react';
import { Form, Radio } from 'antd';

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
  defaultValue?: any;
}

export const RadioFormField: React.FC<RadioFormFieldProps> = (props) => {
  const { name, label, options, rules, defaultValue } = props;
  // Find the initially checked option

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Radio.Group defaultValue={defaultValue}>
        {options.map((option) => (
          <Radio value={option.value} key={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
