import {
  CheckboxFormField,
  LabelForm,
  RadioFormField,
  SectionLabelForm,
  SelectFormField,
  SwitchFormField,
  TextboxFormField,
} from '@src/components/shared';
import { Col } from 'antd';

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
            rule={[
              {
                required: props.require ? true : false,
                message: props.ruleMessage,
              },
              {
                validator: props.validator,
              },
            ]}
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
            rule={[
              {
                required: props.require ? true : false,
                message: props.ruleMessage,
              },
            ]}
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
            rule={[
              {
                required: props.require ? true : false,
                message: props.ruleMessage,
              },
            ]}
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
            rule={[
              {
                required: props.require ? true : false,
                message: props.ruleMessage,
              },
            ]}
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
            rule={[
              {
                required: props.require ? true : false,
                message: props.ruleMessage,
              },
            ]}
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
          <UploadFiles form={props.form} name={props.name} />
        </Col>
      );
    default:
      return <></>;
  }
};
