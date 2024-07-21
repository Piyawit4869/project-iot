import { Form, Checkbox } from 'antd';
import { FC } from 'react';

interface CheckboxFormFieldProps {
  name: string;
  label: string;
  value?: boolean;
  rule?: any;
}

export const CheckboxFormField: FC<CheckboxFormFieldProps> = ({
  name,
  label,
  value = false,
  rule,
}) => (
  <Form.Item name={name} valuePropName="checked" rules={rule}>
    <Checkbox defaultChecked={value}>{label}</Checkbox>
  </Form.Item>
);
