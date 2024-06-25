import { HomeOutlined, TagFilled } from "@ant-design/icons";
import { Breadcrumb, Form, Button, Row, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";  

export const BranchCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const renderForm = [
    {
      label: "เพิ่มข้อมูลสาขา",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "taxId",
      label: "เลขไอดี",
      placeholder: "กรอกเลขไอดี",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 9 },
      type: "TextboxFormField",
    },
    {
      name: "businessName",
      label: "ชื่อสาขา",
      placeholder: "กรอกชื่อสาขา",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 9 },
      type: "TextboxFormField",
    },
    {
      name: "logoUrl",
      label: "ลิ้งค์โลโก้",
      placeholder: "กรอกลิ้งค์โลโก้",
      
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "businessType",
      label: "ประเภทสาขา",
      placeholder: "กรอกประเภทสาขา",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "businessModel",
      label: "รูปแบบสาขา",
      placeholder: "กรอกรูปแบบสาขา",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "email",
      label: "อีเมลล์",
      placeholder: "กรอกอีเมลล์",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 },
      type: "TextboxFormField",
    },
    {
      name: "websiteUrl",
      label: "ลิ้งค์เว็ปไซต์",
      placeholder: "กรอกลิ้งค์เว็ปไซต์",
      col: { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 },
      type: "TextboxFormField",
    },
    {
      name: "phone",
      label: "เบอร์โทรติดต่อ",
      placeholder: "กรอกเบอร์โทร",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      icon: <TagFilled />,
      label: "ข้อมูลตามทะเบียน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "active",
      label: "ทำงานอยู่",
      placeholder: "ทำงานอยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "descriptions",
      label: "คำอธิบาย",
      placeholder: "กรอกคำอธิบาย",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "addressType",
      label: "ประเภทที่อยู่",
      placeholder: "กรอกประเภทที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "province",
      label: "จังหวัด",
      placeholder: "กรอกจังหวัด",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "district",
      label: "เขต",
      placeholder: "กรอกเขต",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "subdistrict",
      label: "ตำบล",
      placeholder: "กรอกตำบล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "address",
      label: "ที่อยู่",
      placeholder: "กรอกที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "postalCode",
      label: "รหัสไปรษณีย์",
      placeholder: "รหัสไปรษณีย์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log("Form Submitted", payload);
  };

  return (
    <div style={{ padding: "20px", fontFamily: 'Prompt, sans-serif' }}>
      <Col span={24}>
        <Breadcrumb style={{ marginBottom: "20px" }}>
          <Breadcrumb.Item onClick={() => navigate("/")}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/branch")}>
          ข้อมูลสาขา
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          เพิ่มข้อมูลสาขา
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      
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
                    require={item.require} disabled={false} checked={false}                  />
                );
              })}
            </Row>
          </Col>
        </Row>
        <Flex style={{ marginTop: "20px", gap: "10px" }}>
        <Form.Item><Button type="primary" onClick={() => navigate("/branch")}>ยกเลิก</Button></Form.Item>
        <Form.Item><Button type="primary" htmlType="submit">ยืนยัน</Button></Form.Item>
      </Flex>
      </Form>
    </div>
  );
};

export default BranchCreate;
