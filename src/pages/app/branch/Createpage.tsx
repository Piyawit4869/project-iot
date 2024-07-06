import {  TagFilled } from "@ant-design/icons";
import { Form,  Row, Col } from "antd";

import { DynamicForm } from "@src/forms/Dynamic";  
import { FormButtonsCreate } from "@src/components/shared/FormButtons";


export const BranchCreate = () => {
  const [form] = Form.useForm();

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
      name: "websiteUrl",
      label: "ลิ้งค์เว็ปไซต์",
      placeholder: "กรอกลิ้งค์เว็ปไซต์",
      col: { xs: 24, sm: 24, md: 12, lg: 6, xl: 6 },
      type: "TextboxFormField",
      validator: (_: any, value: any) => {
        if (value === undefined || value === "") {
          return undefined;
        }
        if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)) {
          return Promise.reject("ลิ้งค์เว็ปไซต์ติดต่อไม่ถูกต้อง");
        }
      }
    },
    {
      name: "phone",
      label: "เบอร์โทรติดต่อ",
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
    {
      name: "active",
      label: "พร้อมใช้งาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      icon: <TagFilled />,
      label: "ข้อมูลที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "LabelForm",
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
      maxLength: 5,
      validator: (_: any, value: any) => {
        if (value === undefined || value === "") {
          return undefined;
        }
        if (!/^[0-9]{5}$/i.test(value)) {
          return Promise.reject("รหัสไปรษณีย์ไม่ถูกต้อง");
        }
      },
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
              {renderForm.map((item: any, index: number) => {
                return (
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
                );
              })}
            </Row>
          </Col>
        </Row>
      </Form>
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
                      checked={item.checked}    />
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Form>
      </div></>
  );
};

export default BranchCreate;
