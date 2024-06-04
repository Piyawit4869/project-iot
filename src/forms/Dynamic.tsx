import {
  CheckboxFormField,
  LabelForm,
  RadioFormField,
  SelectFormField,
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
  type: string;
  col: any;
  option: any;
  icon: any;
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
          <RadioFormField name={props.name} options={[props.option]} />
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
