import { Form, Select } from 'antd';
import { CSSProperties } from 'react';

interface SelectFormFieldProps {
  label: string;
  name: string;
  options: Array<object>;
  placeholder?: string;
  rule?: any;
  disabled: boolean;
  defaultValue?: any;
}

export const SelectFormField: React.FC<SelectFormFieldProps> = (
  props: SelectFormFieldProps,
) => {
  const { options, placeholder, name, label, disabled, rule, defaultValue } =
    props;
  return (
    <Form.Item label={label} name={name} rules={rule}>
      <Select
        defaultValue={defaultValue}
        style={styles.input}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
      ></Select>
    </Form.Item>
  );
};
const styles: Record<string, CSSProperties> = {
  input: {
    width: '100%',
    margin: '5px 0',
    marginTop: -10,
  },
};
