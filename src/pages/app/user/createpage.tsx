import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Button, Row, Col, Dropdown, Menu, Typography, Flex } from "antd";
import { RadioFormField, TextboxFormField } from "@src/components/shared";
import { useNavigate } from "react-router-dom";

const items = [
  { key: '1', label: 'นาย' },
  { key: '2', label: 'นาง' },
  { key: '3', label: 'นางสาว' },
];

export const UsersCreate = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <Row>
        <Col span={24}>
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item onClick={() => navigate('/')}>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/users')}>
              ข้อมูลผู้ใช้
            </Breadcrumb.Item>
            <Breadcrumb.Item>ลงทะเบียนผู้ใช้</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Typography.Title level={2}>ลงทะเบียนผู้ใช้</Typography.Title>
      <Row gutter={24}>
        <Col span={16}>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                <Form.Item label="คำนำหน้า">
                  <Dropdown overlay={<Menu items={items} />} placement="bottomLeft" arrow>
                    <Button>เลือกคำนำหน้า</Button>
                  </Dropdown>
                </Form.Item>
              </Col>
              <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="firstName" label="ชื่อจริง" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="lastName" label="นามสกุล" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="email" label="อีเมล" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="username" label="ชื่อผู้ใช้" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="password" label="รหัสผ่าน" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="phoneNumber" label="เบอร์โทรศัพท์" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <TextboxFormField placeholder="-" name="birthDate" label="วันเกิด" type="date" />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <RadioFormField
                  name="gender"
                  options={[
                    { value: "male", label: "ชาย" },
                    { value: "female", label: "หญิง" },
                    { value: "other", label: "อื่นๆ" },
                  ]}
                  label="เพศ"
                />
              </Col>
              </Row>
            </Row>
          </Form>
        </Col>
      </Row>
      <Flex style={{ marginTop: '20px' }}>
        <Button type="default">ยกเลิก</Button>
        <Button type="primary">ยืนยัน</Button>
        </Flex>
    </div>
  );
};

