import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Timeline,
  Affix,
} from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";

export const ProjectSingle = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const renderForm = [
    {
      label: "แก้ไขข้อมูลโครงการ",
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "name",
      label: "ชื่อโครงการ",
      placeholder: "name",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "description",
      label: "อธิบาย",
      placeholder: "description",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "active",
      label: "ทำงานอยู่",
      placeholder: "active",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "isMainBranch",
      label: "สาขาหลัก",
      placeholder: "isMainBranch",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 6 },
      type: "CheckboxFormField",
    },
    {
      name: "email",
      label: "อีเมล",
      placeholder: "email",
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "tel",
      label: "เบอร์ติดต่อ",
      placeholder: "tel",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "imageUrl",
      label: "ลิ้งค์รูปภาพ",
      placeholder: "imageUrl",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    
    {
      name: "website",
      label: "เว็บไซต์",
      placeholder: "website",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log("Form Submitted", payload);
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
            <Affix offsetTop={20}>
              <div style={{ maxHeight: "450px", overflowY: "auto", padding: "40px", border: "5px solid #d9d9d9", borderRadius: "1px" }}>
                
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
        <Row gutter={24} style={{ marginTop: "20px" }}>
        <Form.Item><Button type="primary" onClick={() => navigate("/project")}>ยกเลิก</Button></Form.Item>
        <Col>
            <Form.Item><Button type="primary" htmlType="submit"> ยืนยัน</Button></Form.Item>
          </Col>
          <Col><Button type="primary" danger>ลบ</Button></Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectSingle;

