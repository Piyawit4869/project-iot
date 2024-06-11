import {
  CheckboxFormField,
  LabelForm,
  RadioFormField,
  SectionLabelForm,
  SelectFormField,
  SwitchFormField,
  TextboxFormField,
} from "@src/components/shared";
import { Col } from "antd";

import { DatePickerFormField } from "@src/components/shared/DatePicker";
import { TextAreaFormField } from "@src/components/shared/TextAreaFormField";

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
}

export const DynamicForm: React.FC<DynamicFormProps> = (
  props: DynamicFormProps
) => {
  switch (props.type) {
    case "TextboxFormField":
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
            rule={[
              {
                required: props.require ? true : false,
                message: props.ruleMessage,
              },
            ]}
          />
        </Col>
      );
    case "SelectFormField":
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
    case "LabelForm":
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
    case "TextAreaFormField":
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
    case "DatePickerFormField":
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
    case "CheckboxFormField":
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

    case "RadioFormField":
      return (
        <Col
          xs={props.col.xs}
          sm={props.col.sm}
          md={props.col.md}
          lg={props.col.lg}
          xl={props.col.xl}
        >
          <RadioFormField
            name={props.name}
            options={props.option}
            label={props.label}
          />
        </Col>
      );

    case "SwitchFormField":
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

    case "SectionLabelForm":
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
    default:
      return <></>;
  }

  // const switchForm =
  //     switch (key) {
  //       case value:
  //         break;
  //       default:
  //         break;
  //     }
  // return (
  //   <Row>
  /* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <LabelForm
          style={{ marginBottom: -30 }}
          icon={props.LabelFormIcon}
          label={props.LabelFormLabel}
          children={props.LabelFormChildren}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={16}>
        <TextboxFormField
          placeholder={props.TextboxFormPlaceholder}
          name={
            props.IsObject
              ? [props.TextboxFormName, props.TextboxFormValue]
              : props.TextboxFormName
          }
          label={props.TextboxFormLabel}
        />
      </Col> */
  // </Row>
  // );
};
