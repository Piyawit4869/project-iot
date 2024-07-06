import { Form, Row, Col } from "antd";
import { DynamicForm } from "@src/forms/Dynamic";
import { FormButtonsCreate } from "@src/components/shared/FormButtons";

export const ProjectCreate = () => {
  const [form] = Form.useForm();

  const renderForm = [
    {
      label: "เพิ่มข้อมูลโครงการ",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "name",
      label: "ชื่อสาขา",
      placeholder: "กรอกชื่อสาขา",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "description",
      label: "อธิบาย",
      placeholder: "อธิบาย",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "active",
      label: "ทำงานอยู่",
      placeholder: "ทำงานอยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "SwitchFormField",
    },
    {
      name: "isMainBranch",
      label: "สาขาหลัก",
      placeholder: "เป็นสาขาหลัก",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "SwitchFormField",
    },
    {
      name: "email",
      label: "อีเมล",
      placeholder: "กรอกอีเมล",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "tel",
      label: "เบอร์โทรติดต่อ",
      placeholder: "กรอกเบอร์โทรติดต่อ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "imageUrl",
      label: "ลิ้งค์รูปภาพ",
      placeholder: "กรอกลิ้งค์รูปภาพ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "website",
      label: "ลิ้งค์เว็บไซต์",
      placeholder: "กรอกลิ้งค์เว็บไซต์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log("Form Submitted", payload);
  };

  function handleFinish(_values: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div>
        <FormButtonsCreate form={form} onFinish={handleFinish} />
      </div>
      <div style={{ padding: "20px", fontFamily: 'Prompt, sans-serif' }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            <Col
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              lg={{ span: 12, order: 1 }}
              xl={{ span: 12, order: 1 }}
            >
              <Row gutter={24}>
                {renderForm.map((item: any) => {
                  return (
                    <DynamicForm
                      key={item.name}
                      name={item.name}
                      label={item.label}
                      placeholder={item.placeholder}
                      type={item.type}
                      col={item.col}
                      option={item.option}
                      icon={item.icon}
                      value={item.value}
                      ruleMessage={item.message}
                      require={item.require}
                      disabled={item.disabled}
                      checked={item.checked}
                    />
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ProjectCreate;
