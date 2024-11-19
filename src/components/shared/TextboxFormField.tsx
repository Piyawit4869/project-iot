import { Form, Input } from 'antd';
import React from 'react';
import { CSSProperties, FC } from 'react';

interface TextboxFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  rule?: any;
  disabled: boolean;
  maxLength?: number;
  businessType?: string;
  isName?: boolean;
  validateStatus?: any;
  isUniq?: any;
  errorUniqMessage?: any;
}

export const TextboxFormField: FC<TextboxFormFieldProps> = (
  props: TextboxFormFieldProps,
) => {
  const {
    name,
    label,
    placeholder,
    type,
    rule,
    disabled,
    maxLength,
    businessType,
    isName,
    validateStatus,
    isUniq,
    errorUniqMessage,
  } = props;
  const [value, setValue] = React.useState('');

  const helpValue = () => {
    let text = 'ตัวอย่างการแสดงผล : ' + value;

    const handleType = (type: any) => {
      switch (type) {
        case 'company_limited':
          return 'จำกัด';
        case 'public_company_limited':
          return 'จำกัด (มหาชน)';
        case 'limited_partnership':
          return 'ห้างหุ้นส่วนจำกัด';
        case 'foundation':
          return 'มูลนิธิ';
        case 'association':
          return 'สมาคม';
        case 'joint_venture':
          return 'กิจการร่วมค้า';

        default:
          return '';
      }
    };
    if (
      businessType === 'company_limited' ||
      businessType === 'public_company_limited'
    ) {
      text =
        'ตัวอย่างการแสดงผล : ' +
        'บริษัท' +
        ' ' +
        value +
        ' ' +
        handleType(businessType);
    } else if (
      businessType === 'limited_partnership' ||
      businessType === 'foundation' ||
      businessType === 'association' ||
      businessType === 'joint_venture'
    ) {
      text = 'ตัวอย่างการแสดงผล : ' + handleType(businessType) + ' ' + value;
    }

    return text;
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rule}
      help={isName ? (isUniq ? errorUniqMessage : helpValue()) : undefined}
      validateStatus={errorUniqMessage ? validateStatus : undefined}
      hasFeedback
    >
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={styles.input}
        maxLength={maxLength}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
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
