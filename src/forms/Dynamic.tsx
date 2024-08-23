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

interface DynamicFormProps {
  value: boolean | undefined;
  name: any;
  label: any;
  placeholder: any;
  type: any;
  col: any;
  option: any;
  icon: any;
  ruleMessage: string;
  require: boolean;
  disabled: boolean;
  checked: boolean;
  maxLength?: number;
  validator?: any;
  form?: any;
  checkedText?: string;
  unCheckedText?: string;
  defaultValue?: string;
  businessType?: string;
  isName?: boolean;
  title?: string;
  description?: string;
  formValue?: any;
}

export const DynamicForm: React.FC<DynamicFormProps> = (
  props: DynamicFormProps,
) => {
  switch (props.type) {
    case 'TextboxFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <TextboxFormField
            placeholder={props.placeholder}
            name={props.name}
            label={props.label}
            type={props.type}
            disabled={props.disabled}
            maxLength={props.maxLength}
            businessType={props.businessType}
            require={props.require}
            isName={props.isName}
          />
        </Col>
      );
    case 'SelectFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <SelectFormField
            placeholder={props.placeholder}
            name={props.name}
            label={props.label}
            options={props.option}
            disabled={props.disabled}
            require={props.require}
            defaultValue={props.defaultValue}
            // rule={[
            //   {
            //     required: props.require ? true : false,
            //     message: props.ruleMessage,
            //   },
            // ]}
          />
        </Col>
      );
    case 'LabelForm':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <LabelForm
            label={props.label}
            children={undefined}
            icon={props.icon}
          />
        </Col>
      );
    case 'TextAreaFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <TextAreaFormField
            placeholder={props.placeholder}
            name={props.name}
            label={props.label}
            rows={3}
            require={props.require}
            // rule={[
            //   {
            //     required: props.require ? true : false,
            //     message: props.ruleMessage,
            //   },
            // ]}
            disabled={props.disabled}
          />
        </Col>
      );
    case 'DatePickerFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <DatePickerFormField
            placeholder={props.placeholder}
            name={props.name}
            label={props.label}
            require={props.require}
            // rule={[
            //   {
            //     required: props.require ? true : false,
            //     message: props.ruleMessage,
            //   },
            // ]}
          />
        </Col>
      );
    case 'CheckboxFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <CheckboxFormField
            value={props.value}
            name={props.name}
            label={props.label}
            require={props.require}
            // rule={[
            //   {
            //     required: props.require ? true : false,
            //     message: props.ruleMessage,
            //   },
            // ]}
          />
        </Col>
      );

    case 'RadioFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <RadioFormField
            name={props.name}
            options={props.option}
            label={props.label}
            require={props.require}
            defaultValue={props.defaultValue}
          />
        </Col>
      );

    case 'SwitchFormField':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <SwitchFormField
            name={props.name}
            label={props.label}
            disabled={props.disabled}
            checked={props.checked}
            checkedText={props.checkedText}
            unCheckedText={props.unCheckedText}
            require={props.require}
          />
        </Col>
      );

    case 'SectionLabelForm':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <SectionLabelForm label={props.label} />
        </Col>
      );
    case 'UploadFile':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <UploadFiles
            form={props.form}
            name={props.name}
            required={props.require}
            label={props.label}
          />
        </Col>
      );
    case 'ActiveCard':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <Card
            style={{
              background: 'white',
              margin: '10px 0  10px 0',
              borderRadius: '20px',
            }}
            bodyStyle={{ padding: '0px 20px' }}
          >
            <Typography.Title level={5}>{props.title}</Typography.Title>
            <Typography.Paragraph>{props.description}</Typography.Paragraph>
            <SwitchFormField
              name={props.name}
              label={''}
              disabled={props.disabled}
              checked={props.checked}
              checkedText={props.checkedText}
              unCheckedText={props.unCheckedText}
              require={false}
            />
          </Card>
        </Col>
      );
    case 'LengthInput':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <LengthInputFormField
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            disabled={props.disabled}
            require={props.require}
            maxLength={props.maxLength}
          ></LengthInputFormField>
        </Col>
      );
    case 'PhoneInput':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <PhoneInputFormField
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            disabled={props.disabled}
            require={props.require}
          ></PhoneInputFormField>
        </Col>
      );
    case 'ButtonGetOrganizeValue':
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <RadioGetOrgValue form={props.form} />
        </Col>
      );
    default:
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        />
      );
  }
};
