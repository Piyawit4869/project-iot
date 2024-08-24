import { Form } from 'antd';
import PhoneInput from 'react-phone-input-2';
import { CSSProperties, FC } from 'react';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rule?: any;
  disabled: boolean;
}

export const PhoneInputFormField: FC<PhoneInputFormFieldProps> = (
  props: PhoneInputFormFieldProps,
) => {
  const { name, label, placeholder, rule, disabled } = props;

  return (
    <Form.Item name={name} label={label} rules={rule}>
      <PhoneInput
        country={'th'}
        placeholder={placeholder}
        disabled={disabled}
        enableSearch={true}
        inputStyle={styles.input}
        onChange={(phone) => {
          console.log('Phone number:', phone);
        }}
        inputClass="ant-input"
        buttonClass="ant-input-group-addon"
      />
    </Form.Item>
  );
};

const styles: Record<string, CSSProperties> = {
  input: {
    width: '100%',
    marginBottom: '10px',
  },
};
