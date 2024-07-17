
import {  Form, Row, Col } from "antd";
import { DynamicForm } from "@src/forms/Dynamic";
import { FormButtonsCreate } from "@src/components/shared/FormButtons";

export const UsersCreate = () => {
  const [form] = Form.useForm();
  const renderForm = [
    {
      label: "เพิ่มข้อมูลผู้ใช้",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: "LabelForm",
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
      name: ["user", "profix"],
      label: "คำนำหน้า",
      placeholder: "กรอกคำนำหน้า",
      col: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
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
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
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
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
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
      name: "active",
      label: "ทำงานอยู่",
      placeholder: "เลือกทำงานอยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 },
      type: "SwitchFormField",
    },
    {
      name: "isMobile",
      label: "ใช้งานบนมือถือ",
      placeholder: "ใช้งานบนมือถือ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "SwitchFormField",
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

  function handleFinish(_values: any): void {
    throw new Error("Function not implemented.");
  }

  return (

      <div><FormButtonsCreate form={form} onFinish={handleFinish} />
   
   <div style={{fontFamily: "Prompt, sans-serif" }}>
   <div style={{ padding: "20px", marginTop: "10px" }}>
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
                  require={item.require} 
                  disabled={item.disabled}
                  checked={item.checked}  
                  maxLength={item.maxLength}
                  validator={item.validator}                          
                  />
              ))}
            </Row>
          </Col>
        </Row>
      </Form>
      </div>
      </div>
    </div>

  );
};

export default UsersCreate;
