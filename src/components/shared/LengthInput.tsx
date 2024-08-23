import { Form, Input } from 'antd';
import { CSSProperties, FC } from 'react';

interface LengthInputFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rule?: any;
  disabled: boolean;
  maxLength?: number;
  require: boolean;
}

export const LengthInputFormField: FC<LengthInputFormFieldProps> = (
  props: LengthInputFormFieldProps,
) => {
  const { name, label, placeholder, rule, disabled, maxLength, require } =
    props;

  return (
    <Form.Item required={require} name={name} label={label} rules={rule}>
      <Input.OTP
        placeholder={placeholder}
        disabled={disabled}
        style={styles.input}
        length={maxLength}
        variant="filled"
      />
    </Form.Item>
  );
};

const styles: Record<string, CSSProperties> = {
  input: {
    width: '100%',
    margin: '5px 0',
  },
};
