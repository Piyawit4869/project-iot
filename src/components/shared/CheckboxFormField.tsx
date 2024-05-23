import { Form, Checkbox } from "antd";
import { FC } from "react";

interface CheckboxFormFieldProps {
  name: string;
  label: string;
  value?: boolean;
}

export const CheckboxFormField: FC<CheckboxFormFieldProps> = ({
  name,
  label,
  value = false,
}) => (
  <Form.Item name={name} valuePropName="checked">
    <Checkbox defaultChecked={value}>{label}</Checkbox>
  </Form.Item>
);
