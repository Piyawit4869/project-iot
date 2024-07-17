import { Col, Form, Row } from "antd";
import { useSubmit } from "react-router-dom";
import dayjs from "dayjs";
import React from "react";
import { DynamicForm } from "./Dynamic";
import { FormButtonsEdit } from "@src/components/shared/FormButtons";
import { renderForm } from "./renderForm";

interface OrganizeEditFormProps {
  initialValues?: any;
}

export const OrganizeEditForm: React.FC<OrganizeEditFormProps> = (
  props: OrganizeEditFormProps
) => {
  const { initialValues } = props;

  const [form] = Form.useForm();
  const submit = useSubmit();

  const formatDate = (isoDateString: any) => {
    return dayjs(isoDateString);
  };

  const onFinish = (values: any) => {
    const payload = { ...values };
    payload.businessRegister = formatDate(payload.businessRegister);
    payload.active = true;
    payload.addressData = [];
    payload.branchesData = [];
    payload.userData = [];
    payload.descriptions = "-";
    payload.logoUrl =
      "https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&";

    submit(
      { data: JSON.stringify(payload), action: "edit" },
      { method: "put" }
    );
  };

  React.useEffect(() => {
    let businessRegister = null;
    if (initialValues && initialValues.businessRegister) {
      businessRegister = dayjs(initialValues.businessRegister);
    }
    form.setFieldsValue({
      ...initialValues,
      businessRegister,
    });
  }, [form, initialValues]);

  function handleFinish(_values: any): void {
    throw new Error("Function not implemented.");
  }

  return (
  
      <div>
        <FormButtonsEdit form={form} onFinish={handleFinish} />
      <div style={{fontFamily: "Prompt, sans-serif" }}>
      <div style={{ padding: "20px", marginTop: "10px" }}>
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div style={{ fontSize: 22, fontWeight: "bold" }}></div>
      <Col
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={{ span: 24, order: 2 }}
        lg={{ span: 12, order: 2 }}
        xl={{ span: 12, order: 1 }}
      >
        <Row gutter={20}>
          {renderForm?.map((item: any) => {
            return (
              <DynamicForm
                key={item.value}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                col={item.col}
                option={item.option}
                icon={item.icon ? React.createElement(item.icon) : null}
                value={item.value}
                ruleMessage={item.message}
                require={item.require}
                disabled={item.disabled}
                checked={item.checked}
                maxLength={item.maxLength}
                validator={item.validator}
                />
            );
          })}
        </Row>
      </Col>
    </Form>
    </div>
    </div>
    </div>
  );
};
