import { Form, Checkbox } from 'antd';
import { FC } from 'react';

interface CheckboxFormFieldProps {
  name: string;
  label: string;
  value?: boolean;
  rule?: any;
  require: boolean;
}

export const CheckboxFormField: FC<CheckboxFormFieldProps> = ({
  name,
  label,
  value = false,
  rule,
  require,
}) => (
  <Form.Item
    required={require}
    name={name}
    valuePropName="checked"
    rules={rule}
  >
    <Checkbox defaultChecked={value}>{label}</Checkbox>
  </Form.Item>
);
