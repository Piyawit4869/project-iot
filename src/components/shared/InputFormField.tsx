import { Form, Input } from 'antd';
import { CSSProperties } from 'react';

interface InputFormFieldProps {
  name: string;
  label: string;
  // type: string;
  placeholder?: string;
  required?: boolean;
  // options?: { value: string; label: string }[];
}

export const InputFormField: React.FC<InputFormFieldProps> = (
  props: InputFormFieldProps,
) => {
  const { name, label, placeholder, required } = props;
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: `Please input your ${label}!`,
        },
      ]}
    >
      <Input placeholder={placeholder} style={styles.input} />
    </Form.Item>
  );
};

const styles: Record<string, CSSProperties> = {
  input: {
    borderRadius: '10px',
    border: '1px solid #ccc',
    padding: '10px',
  },
};
