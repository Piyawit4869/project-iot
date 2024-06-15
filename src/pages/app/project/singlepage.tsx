import React, { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Button, Row, Col, Timeline } from "antd";
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
  },
  {
    name: "tel",
    label: "เบอร์ติดต่อ",
    placeholder: "tel",
    col: { xs: 24, md: 12 },
    type: "TextboxFormField",
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

export const ProjectSingle: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const onFinish = (values: any) => {
    console.log("Form Submitted", values);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Col span={24}>
        <Breadcrumb style={{ marginBottom: "20px" }}>
          <Breadcrumb.Item onClick={() => navigate("/")}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/project")}>
            ข้อมูลโครงการ
          </Breadcrumb.Item>
          <Breadcrumb.Item>แก้ไขข้อมูลโครงการ</Breadcrumb.Item>
        </Breadcrumb>
      </Col>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
            <Row gutter={24}>
              {renderForm.map((item: any) => (
                <DynamicForm
                  key={item.name}
                  {...item}
                  disabled={false}
                  checked={false}
                />
              ))}
            </Row>
          </Col>
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
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
              {timelineItems.length > 5 && (
                <Button type="link" onClick={() => setShowMore(!showMore)}>
                  {showMore ? "See Less" : "See More"}
                </Button>
              )}
            </div>
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
          <Col>
            <Button type="primary" danger>
              ลบ
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectSingle;
