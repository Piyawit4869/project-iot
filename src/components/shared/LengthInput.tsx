import { Form, Input } from 'antd';
import { CSSProperties, FC } from 'react';

interface LengthInputFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rule?: any;
  disabled: boolean;
  maxLength?: number;
  isUniq?: boolean;
  validateStatus?: any;
  errorUniqMessage?: string;
}

export const LengthInputFormField: FC<LengthInputFormFieldProps> = (
  props: LengthInputFormFieldProps,
) => {
  const {
    name,
    label,
    placeholder,
    rule,
    disabled,
    maxLength,
    validateStatus,
    isUniq,
    errorUniqMessage,
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rule}
      help={isUniq ? errorUniqMessage : undefined}
      validateStatus={validateStatus ? validateStatus : undefined}
      hasFeedback
    >
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

//0105565119323
