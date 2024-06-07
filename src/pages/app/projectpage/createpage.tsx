
import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Typography,
  Flex,
} from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";

export const ProjectCreate = () => {
  const navigate = useNavigate();

  const renderForm = [
    {
      name: "name",
      label: "ชื่อสาขา",
      placeholder: "ชื่อสาขา",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },

    {
      name: "active",
      label: "active",
      placeholder: "active",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },

    {
      name: "isMainBranch",
      label: "เป็นสาขาหลัก",
      placeholder: "เป็นสาขาหลัก",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "description",
      label: "อธิบาย",
      placeholder: "อธิบาย",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "password",
      label: "รหัสผ่าน",
      placeholder: "รหัสผ่าน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "tel",
      label: "เบอร์ติดต่อ",
      placeholder: "เบอร์ติดต่อ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "imageUrl",
      label: "ลิ้งค์รูปภาพ",
      placeholder: "active",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "email",
      label: "อีเมล",
      placeholder: "อีเมล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    ,
    {
      name: "website",
      label: "เว็บไซต์",
      placeholder: "เว็บไซต์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },

    {
      label: "เพิ่มที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "address",
      label: "ที่อยู่",
      placeholder: "กรอกที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "subdistrict",
      label: "ตำบล",
      placeholder: "ตำบล",
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
      name: "province",
      label: "จังหวัด",
      placeholder: "กรอกจังหวัด",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "country",
      label: "ประเทศ",
      placeholder: "กรอกประเทศ",
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
  
  return (
    <div style={{ padding: "20px" }}>
        <Col span={24}>
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate("/users")}>ข้อมูลผู้ใช้</Breadcrumb.Item>
            <Breadcrumb.Item>ลงทะเบียนผู้ใช้</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Typography.Title level={2}>สร้างโครงการ</Typography.Title>
      <Col span={12}>
        <Row gutter={24}>
        <Col span={12}>
        <Form layout="vertical">
        <Row gutter={24}>         
      {renderForm.map((item: any) => {
            return (

              <DynamicForm
                key={item.value}
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
              />
            );
          })}
          </Row>
           </Form>   
          </Col>
          </Row>
          </Col>
          
        <Flex style={{ marginTop: "20px" }}>
                  <Button type="primary">ยกเลิก</Button>
                  <Button type="primary">ยืนยัน</Button>
                  <Button type="primary">ลบ</Button>
                </Flex>
    </div>
  );

};

export default ProjectCreate;