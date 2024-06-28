import {  TagFilled } from "@ant-design/icons";
import {  Form, Button, Row, Col, Timeline } from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";
import { useRef, useState } from "react";


export const BranchSingle = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const renderForm = [
    {
      label: "แก้ไขข้อมูลสาขา",
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
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 9 },
      type: "TextboxFormField",
    },
    {
      name: "logoUrl",
      label: "ลิ้งค์โลโก้",
      placeholder: "กรอกลิ้งค์โลโก้",
      require: true,
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

  const timelineItems = [
    "Create a services site 2015-09-01",
    "Solve initial network problems 2015-09-01",
    "Technical testing 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
    "Network problems being solved 2015-09-01",
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log("Form Submitted", payload);
  };

  return (
    <div style={{ padding: "20px" }} ref={containerRef}>
      
      
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
                  require={item.require}
                  disabled={false}
                  checked={false}
                />
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
            <div style={{ height: "100px" }}>
              <h1>กิจกรรม</h1>
            </div>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                padding: "40px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
              }}
            >
              <Timeline>
                {(showMore ? timelineItems : timelineItems.slice(0, 5)).map(
                  (item, index) => (
                    <Timeline.Item key={index}>{item}</Timeline.Item>
                  )
                )}
              </Timeline>
              {timelineItems.length > 10 && (
                <div style={{ textAlign: "right", marginTop: "10px" }}>
                  <Button type="link" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "See Less" : "See More"}
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", gap: "10px" }}>
          <Col><Button type="primary" onClick={() => navigate("/branch")}>ยกเลิก</Button></Col>
          <Col><Button type="primary" htmlType="submit">ยืนยัน</Button></Col>
          <Col><Button type="primary" danger>ลบ</Button></Col>
        </Row>
      </Form>
    </div>
  );
};

export default BranchSingle;
