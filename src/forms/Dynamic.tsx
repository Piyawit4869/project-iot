import {
  RadioGetOrgValue,
  CheckboxFormField,
  LabelForm,
  LengthInputFormField,
  PhoneInputFormField,
  RadioFormField,
  SectionLabelForm,
  SelectFormField,
  SwitchFormField,
  TextboxFormField,
} from '@src/components/shared';
import { Card, Col, Typography } from 'antd';

import { DatePickerFormField } from '@src/components/shared/DatePicker';
import { TextAreaFormField } from '@src/components/shared/TextAreaFormField';
import { UploadFiles } from '@src/components/shared/UploadFile';
import { Rule } from 'antd/es/form';

interface DynamicFormProps {
  value: boolean | undefined;
  name: any;
  label: any;
  placeholder: any;
  type: any;
  col: any;
  option: any;
  icon: any;
  disabled: boolean;
  checked: boolean;
  maxLength?: number;
  form?: any;
  checkedText?: string;
  unCheckedText?: string;
  defaultValue?: string;
  businessType?: string;
  isName?: boolean;
  title?: string;
  description?: string;
  rule?: Rule[] | undefined;
}

export const DynamicForm: React.FC<DynamicFormProps> = (
  props: DynamicFormProps,
) => {
  const {
    form,
    name,
    type,
    col,
    placeholder,
    label,
    disabled,
    maxLength,
    businessType,
    isName,
    rule,
    option,
    defaultValue,
    icon,
    value,
    checked,
    checkedText,
    unCheckedText,
    title,
    description,
  } = props;
  switch (type) {
    case 'TextboxFormField':
      return (
        <Col {...col}>
          <TextboxFormField
            placeholder={placeholder}
            name={name}
            label={label}
            type={type}
            disabled={disabled}
            maxLength={maxLength}
            businessType={businessType}
            isName={isName}
            rule={rule}
          />
        </Col>
      );
    case 'SelectFormField':
      return (
        <Col {...col}>
          <SelectFormField
            placeholder={placeholder}
            name={name}
            label={label}
            options={option}
            disabled={disabled}
            defaultValue={defaultValue}
            rule={rule}
          />
        </Col>
      );
    case 'LabelForm':
      return (
        <Col {...col}>
          <LabelForm label={label} children={undefined} icon={icon} />
        </Col>
      );
    case 'TextAreaFormField':
      return (
        <Col {...col}>
          <TextAreaFormField
            placeholder={placeholder}
            name={name}
            label={label}
            rows={3}
            rule={rule}
            disabled={disabled}
          />
        </Col>
      );
    case 'DatePickerFormField':
      return (
        <Col {...col}>
          <DatePickerFormField
            placeholder={placeholder}
            name={name}
            label={label}
          />
        </Col>
      );
    case 'CheckboxFormField':
      return (
        <Col {...col}>
          <CheckboxFormField value={value} name={name} label={label} />
        </Col>
      );

    case 'RadioFormField':
      return (
        <Col {...col} style={{ display: 'flex', alignItems: 'center' }}>
          <RadioFormField
            name={name}
            options={option}
            label={label}
            defaultValue={defaultValue}
            rules={rule}
          />
        </Col>
      );

    case 'SwitchFormField':
      return (
        <Col {...col}>
          <SwitchFormField
            name={name}
            label={label}
            disabled={disabled}
            checked={checked}
            checkedText={checkedText}
            unCheckedText={unCheckedText}
            rules={rule}
          />
        </Col>
      );

    case 'SectionLabelForm':
      return (
        <Col {...col}>
          <SectionLabelForm label={label} />
        </Col>
      );
    case 'UploadFile':
      return (
        <Col {...col}>
          <UploadFiles form={form} name={name} label={label} />
        </Col>
      );
    case 'ActiveCard':
      return (
        <Col {...col}>
          <Card
            style={{
              background: 'white',
              margin: '10px 0  10px 0',
              borderRadius: '20px',
            }}
            bodyStyle={{ padding: '0px 20px' }}
          >
            <Typography.Title level={5}>{title}</Typography.Title>
            <Typography.Paragraph>{description}</Typography.Paragraph>
            <SwitchFormField
              name={name}
              label={label}
              disabled={disabled}
              checked={checked}
              checkedText={checkedText}
              unCheckedText={unCheckedText}
            />
          </Card>
        </Col>
      );
    case 'LengthInput':
      return (
        <Col {...col}>
          <LengthInputFormField
            name={name}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rule={rule}
          />
        </Col>
      );
    case 'PhoneInput':
      return (
        <Col {...col}>
          <PhoneInputFormField
            name={name}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            rule={rule}
          />
        </Col>
      );
    case 'ButtonGetOrganizeValue':
      return (
        <Col {...col}>
          <RadioGetOrgValue form={form} />
        </Col>
      );
    default:
      return <Col {...col} />;
  }
};
