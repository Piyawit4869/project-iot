// import { useNavigate } from "react-router-dom";
// import { TextboxFormField } from "@src/components/shared";
// import { Breadcrumb, Button, Col, Flex, Form, Row } from "antd";
// import { HomeOutlined } from "@ant-design/icons";

// export const ProjectSingle = () => {
//     const navigate = useNavigate();
  
//     return (
//         <>
//          <Col span={24}>
//           <Breadcrumb style={{ marginBottom: "20px" }}>
//             <Breadcrumb.Item onClick={() => navigate('/')}>
//               <HomeOutlined />
//             </Breadcrumb.Item>
//             <Breadcrumb.Item onClick={() => navigate('/project')}>
//               โครงการ
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>แก้ไขโครงการ</Breadcrumb.Item>
//           </Breadcrumb>
//         </Col>
//         <h1>แก้ไขโครงการ</h1>
//         <Row>
//          <Col span={16}>
//           <Form layout="vertical">
//            <Row gutter={24}>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="Name" name="Name" label="ชื่อสาขา" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="active" name="active" label="ชื่อสาขา" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="isMainBranch" name="isMainBranch" label="สาขาหลัก" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="description" name="description" label="คำอธิบายสาขาของคุณ" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="email" name="email" label="อีเมล" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="tel" name="tel" label="เบอร์โทร" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="imageUrl" name="imageUrl" label="ลิ้งค์รูปภาพ" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="wedsite" name="wedsite" label="เว็บไซต์" />
//               </Col>
//               </Row>
//           </Form>
//          </Col>
//          </Row>
//          <h1>ที่อยู่</h1>
//          <Row>
//          <Col span={16}>
//           <Form layout="vertical">
//            <Row gutter={24}>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="address" name="address" label="ที่อยู่" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="country" name="country" label="ประเทศ" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="subDistrict" name="subDistrict" label="ตำบล" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="district" name="district" label="เขต" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="province" name="province" label="จังหวัด" /></Col>
//               <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="postalCode" name="postalCode" label="รหัสไปรษณีย์" /></Col>
//            </Row>
//           </Form>
//          </Col>
//         </Row>
//         <Flex style={{ marginTop: '20px' }}>
//         <Button type="default">ลบ</Button>
//         <Button type="default">ยกเลิก</Button>
//         <Button type="primary">ยืนยัน</Button>
//       </Flex>
//    </>
//     )
// }

import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Typography,
  Flex,
  Timeline,
} from "antd";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@src/forms/Dynamic";

export const ProjectSingle = () => {
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
            <Breadcrumb.Item onClick={() => navigate("/users")}>
              ข้อมูลผู้ใช้
            </Breadcrumb.Item>
            <Breadcrumb.Item>แก้ไขโครงการ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Typography.Title level={2}>ลงทะเบียนผู้ใช้</Typography.Title>
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
          

        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 12, order: 1 }}
        >
          <Flex style={{ height: "300px" }} justify="center" align="center">
            <Timeline
              items={[
                { children: "Create a services site 2015-09-01" },
                { children: "Solve initial network problems 2015-09-01" },
                { children: "Technical testing 2015-09-01" },
                { children: "Network problems being solved 2015-09-01" },
              ]}
            />
          </Flex>
        </Col>
        <Flex style={{ marginTop: "20px" }}>
                  <Button type="primary">ยกเลิก</Button>
                  <Button type="primary">ยืนยัน</Button>
                  <Button type="primary">ลบ</Button>
                </Flex>
    </div>
  );

};

export default ProjectSingle;
