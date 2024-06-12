import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Button, Row, Col, Timeline, Affix } from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";
import { useRef } from "react";

export const UsersSingle = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const renderForm = [
    {
      label: "แก้ไขข้อมูลผู้ใช้",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: "LabelForm",
    },
    {
      name: ["user", "profix"],
      label: "คำนำหน้า",
      placeholder: "กรอกคำนำหน้า",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 6 },
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
      col: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "isMobile",
      label: "isMobile",
      placeholder: "isMobile",
      col: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "organizationId",
      label: "รหัสองค์กร",
      placeholder: "รหัสองค์กร",
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
      placeholder: "กรอกลิ้งค์รูปภาพ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "discordGuid",
      label: "กรอกดิสคอร์ดไอดี",
      placeholder: "กรอกดิสคอร์ดไอดี",
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
      placeholder: "เบอร์โทร",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log("Form Submitted", payload);
  };

  return (
    <div style={{ padding: "20px" }} ref={containerRef}>
      <Col span={24}>
        <Breadcrumb style={{ marginBottom: "20px" }}>
          <Breadcrumb.Item onClick={() => navigate("/")}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/users")}>
          ข้อมูลผู้ใช้
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/users/single")}>
          แก้ไขข้อมูลผู้ใช้
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
          <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 1 }}
          xl={{ span: 12, order: 1 }}
        >
           <div style={{ height: "100px" }}  >
          <h1>กิจกรรม</h1>
          </div>
            <Affix offsetTop={20} target={() => containerRef.current}>
              <div style={{ maxHeight: "400px", overflowY: "auto", padding: "40px", border: "1px solid #d9d9d9", borderRadius: "4px" }}>
               
                <Timeline>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                  <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
              </div>
            </Affix>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", gap: "10px" }}>
          <Col><Button type="primary" onClick={() => navigate("/users")}>ยกเลิก</Button></Col>
          <Col><Button type="primary" htmlType="submit">ยืนยัน</Button></Col>
          <Col><Button type="primary" danger>ลบ</Button></Col></Row></Form>
    </div>
  );
};

export default UsersSingle;

