
import {  Form, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";

export const UsersCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const renderForm = [
    {
      label: "เพิ่มข้อมูลผู้ใช้",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: "LabelForm",
    },
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
      validator: (_: any, value: any) => {
        if (value === undefined || value === "") {
          return undefined;
        }
        if (!/^([a-zA-Zก-๙]+)$/.test(value)) {
          return Promise.reject("กรุณากรอกตัวอักษรเท่านั้น");
        }
        return Promise.resolve();
      }
    },
    {
      name: ["user", "profile", "lastName"],
      label: "นามสกุล",
      placeholder: "กรอกนามสกุล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 9 },
      type: "TextboxFormField",
      validator: (_: any, value: any) => {
        if (value === undefined || value === "") {
          return undefined;
        }
        if (!/^([a-zA-Zก-๙]+)$/.test(value)) {
          return Promise.reject("กรุณากรอกตัวอักษรเท่านั้น");
        }
        return Promise.resolve();
      }
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
      validator: (_: any, value: any) => {
        if (value === undefined || value === "") {
          return Promise.reject("");
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return Promise.reject("อีเมลล์ติดต่อไม่ถูกต้อง");
        }
      }
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
      maxLength: 10,
      validator: (_: any, value: any) => {
        if (value === undefined || value === "") {
          return undefined;
        }
        if (!/^(06|08)[0-9]{8}$/.test(value)) {
          return Promise.reject("เบอร์โทรศัพท์ติดต่อไม่ถูกต้อง");
        }
      }
    },
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log("Form Submitted", payload);
  };

  return (
    

    



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
              {renderForm.map((item: any, index: number) => (
                <DynamicForm
                  key={index}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  col={item.col}
                  option={item.option}
                  icon={item.icon}
                  value={item.value}
                  ruleMessage={item.message}
                  require={item.require} disabled={false} checked={false}
                  maxLength={item.maxLength}
                  validator={item.validator}               
                  />
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
