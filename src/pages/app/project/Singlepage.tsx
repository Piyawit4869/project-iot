import React, { useState } from "react";
import {  Form, Button, Row, Col, Timeline } from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";

const renderForm = [
  {
    label: "แก้ไขข้อมูลโครงการ",
    col: { xs: 24 },
    type: "LabelForm",
  },
  {
    name: "name",
    label: "ชื่อโครงการ",
    placeholder: "name",
    require: true,
    col: { xs: 24, md: 12 },
    type: "TextboxFormField",
  },
  {
    name: "description",
    label: "อธิบาย",
    placeholder: "description",
    col: { xs: 24, md: 12 },
    type: "TextboxFormField",
  },
  {
    name: "active",
    label: "ทำงานอยู่",
    placeholder: "active",
    col: { xs: 24, md: 6 },
    type: "CheckboxFormField",
  },
  {
    name: "isMainBranch",
    label: "สาขาหลัก",
    placeholder: "isMainBranch",
    col: { xs: 24, md: 6 },
    type: "CheckboxFormField",
  },
  {
    name: "email",
    label: "อีเมล",
    placeholder: "email",
    require: true,
    col: { xs: 24, md: 12 },
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
    name: "tel",
    label: "เบอร์ติดต่อ",
    placeholder: "tel",
    col: { xs: 24, md: 12 },
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
    name: "imageUrl",
    label: "ลิ้งค์รูปภาพ",
    placeholder: "imageUrl",
    col: { xs: 24, md: 12 },
    type: "TextboxFormField",
  },
  {
    name: "website",
    label: "เว็บไซต์",
    placeholder: "website",
    col: { xs: 24, md: 12 },
    type: "TextboxFormField",
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return undefined;
      }
      if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)) {
        return Promise.reject("เว็บไซต์สำนักงานไม่ถูกต้อง");
      }
    }
  },
];

export const ProjectSingle: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Form Submitted", values);
  };

  return (
    <div style={{ padding: "20px" }}>
      

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
            <Row gutter={24}>
              {renderForm.map((item: any, index: number) => (
                <DynamicForm
                  key={index}
                  {...item}
                  disabled={false}
                  checked={false}
                  maxLength={item.maxLength}
                  validator={item.validator}
                />
              ))}
            </Row>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col>
            <Form.Item>
              <Button type="primary" onClick={() => navigate("/project")}>
                ยกเลิก
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ยืนยัน
              </Button>
            </Form.Item>
            </Col>
          <Col><Button type="primary" danger>ลบ</Button></Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectSingle ;
