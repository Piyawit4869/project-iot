import { useNavigate } from "react-router-dom";
import { TextboxFormField } from "@src/components/shared";
import { Breadcrumb, Button, Col, Flex, Form, Row } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export const ProjectCreate = () => {
    const navigate = useNavigate();
  
    return (
        <>
         <Col span={24}>
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item onClick={() => navigate('/')}>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/project')}>
              โครงการ
            </Breadcrumb.Item>
            <Breadcrumb.Item>สร้างโครงการ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <h1>สร้างโครงการ</h1>
        <Row>
         <Col span={16}>
          <Form layout="vertical">
           <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="Name" name="Name" label="ชื่อสาขา" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="active" name="active" label="ชื่อสาขา" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="isMainBranch" name="isMainBranch" label="สาขาหลัก" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="description" name="description" label="คำอธิบายสาขาของคุณ" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="email" name="email" label="อีเมล" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="tel" name="tel" label="เบอร์โทร" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="imageUrl" name="imageUrl" label="ลิ้งค์รูปภาพ" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="wedsite" name="wedsite" label="เว็บไซต์" />
              </Col>
              </Row>
          </Form>
         </Col>
         </Row>
         <h1>ที่อยู่</h1>
         <Row>
         <Col span={16}>
          <Form layout="vertical">
           <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="address" name="address" label="ที่อยู่" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="country" name="country" label="ประเทศ" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="subDistrict" name="subDistrict" label="ตำบล" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="district" name="district" label="เขต" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="province" name="province" label="จังหวัด" /></Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}><TextboxFormField placeholder="postalCode" name="postalCode" label="รหัสไปรษณีย์" /></Col>
           </Row>
          </Form>
         </Col>
        </Row>
        <Flex style={{ marginTop: '20px' }}>
        <Button type="default">ยกเลิก</Button>
        <Button type="primary">ยืนยัน</Button>
      </Flex>
   </>
    )
}