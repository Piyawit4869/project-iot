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
  } = props;
  const [value, setValue] = React.useState('');

  const helpValue = () => {
    let text = 'ตัวอย่างการแสดงผล : ' + value;

    const handleType = (type: any) => {
      switch (type) {
        case 'CompanyLimited':
          return 'จำกัด';
        case 'PublicCompanyLimited':
          return 'จำกัด (มหาชน)';
        case 'LimitedPartnership':
          return 'ห้างหุ้นส่วนจำกัด';
        case 'Foundation':
          return 'มูลนิธิ';
        case 'Association':
          return 'สมาคม';
        case 'JointVenture':
          return 'กิจการร่วมค้า';

        default:
          return '';
      }
    };
    if (
      businessType === 'CompanyLimited' ||
      businessType === 'PublicCompanyLimited'
    ) {
      text =
        'ตัวอย่างการแสดงผล : ' +
        'บริษัท' +
        ' ' +
        value +
        ' ' +
        handleType(businessType);
    } else if (
      businessType === 'LimitedPartnership' ||
      businessType === 'Foundation' ||
      businessType === 'Association' ||
      businessType === 'JointVenture'
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
      help={isName ? helpValue() : ''}
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
