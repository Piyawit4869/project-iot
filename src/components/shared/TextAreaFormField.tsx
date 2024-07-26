import { Form, Input } from 'antd';
import { CSSProperties, FC } from 'react';

const { TextArea } = Input;

interface TextAreaFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  rule?: any;
  disabled: boolean;
  require: boolean;
}

export const TextAreaFormField: FC<TextAreaFormFieldProps> = (
  props: TextAreaFormFieldProps,
) => {
  const { name, label, placeholder, rows, rule, disabled, require } = props;
  return (
    <Form.Item required={require} name={name} rules={rule} label={label}>
      <TextArea
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        style={styles.textarea}
      />
    </Form.Item>
  );
};

const styles: Record<string, CSSProperties> = {
  textarea: {
    width: '100%',
    margin: '5px 0',
    marginTop: -10,
  },
};
