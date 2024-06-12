import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";

export const UsersCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const renderForm = [
    
    {
      name: ["user", "profix"],
      label: "คำนำหน้า",
      placeholder: "กรอกคำนำหน้า",
      col: { xs: 24, sm: 24, md: 24, lg: 6, xl: 6 },
      type: "SelectFormField",
      option: [
        { value: "Mr", label: "นาย" },
        { value: "Ms", label: "นาง" },
        { value: "Mrs", label: "นางสาว" },
      ],
    },
    {
      name: ["user", "profile", "firstName"],
      label: "ชื่อจริง",
      placeholder: "กรอกชื่อจริง",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 9 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "profile", "lastName"],
      label: "นามสกุล",
      placeholder: "กรอกนามสกุล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 9 },
      type: "TextboxFormField",
    },
    {
      name: "userName",
      label: "ชื่อผู้ใช้",
      placeholder: "กรอกชื่อผู้ใช้",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "email"],
      label: "อีเมลล์",
      placeholder: "กรอกอีเมลล์",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "password",
      label: "รหัสผ่าน",
      placeholder: "กรอกรหัสผ่าน",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "active",
      label: "ทำงานอยู่",
      placeholder: "เลือกทำงานอยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "isMobile",
      label: "คือมือถือ",
      placeholder: "คือมือถือ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "organizationId",
      label: "รหัสองค์กร",
      placeholder: "กรอกรหัสองค์กร",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "roleId",
      label: "บทบาทไอดี",
      placeholder: "กรอกบทบาทไอดี",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    }, 
    {
      name: ["user", "profile", "birthDate"],
      label: "วัน/เดือน/ปีเกิด",
      placeholder: "เลือกวัน/เดือน/ปีเกิด",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "DatePickerFormField",
    },
    {
      name: "photoUrl",
      label: "ลิ้งค์รูปภาพ",
      placeholder: "กรอกรูปภาพ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "discordGuid",
      label: "กรอกดิสคอร์สไอดี",
      placeholder: "กรอกดิสคอร์สไอดี",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    
    {
      name: "deviceToken",
      label: "โทเค็นของอุปกรณ์",
      placeholder: "กรอกโทเค็นของอุปกรณ์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "phone",
      label: "เบอร์โทร",
      placeholder: "กรอกเบอร์โทร",
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
          <Breadcrumb.Item onClick={() => navigate("/users")}>
            ผู้ใช้งาน
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/users/create")}>
          แก้ไขผู้ใช้งาน
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <h1>ผู้ใช้งาน</h1>
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
              {renderForm.map((item: any) => (
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
                  require={item.require} disabled={false} checked={false}                />
              ))}
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", gap: "10px" }}>
          <Col><Button  onClick={() => navigate("/users")}>ยกเลิก</Button></Col>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#19142A' }}>ยืนยัน</Button>
        </Row>
      </Form>
    </div>
  );
};

export default UsersCreate;
