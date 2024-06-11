import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Form,
  Button,
  Row,
  Col,
  Timeline,
  Dropdown,
  Menu,
  Typography,
} from "antd";
import { RadioFormField, TextboxFormField } from "@src/components/shared";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";

const items = [
  { key: "1", label: "นาย" },
  { key: "2", label: "นาง" },
  { key: "3", label: "นางสาว" },
];

const UsersSingle = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col span={12}>
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate("/users")}>
              ข้อมูลผู้ใช้
            </Breadcrumb.Item>
            <Breadcrumb.Item>แก้ไขข้อมูลผู้ใช้</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Typography.Title level={2}>แก้ไขข้อมูลผู้ใช้</Typography.Title>
      <Row gutter={24}>
        <Col span={12}>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                <Form.Item label="คำนำหน้า">
                  <Dropdown
                    overlay={<Menu items={items} />}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button>เลือกคำนำหน้า</Button>
                  </Dropdown>
                </Form.Item>
              </Col>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="firstName"
                    name="firstName"
                    label="ชื่อจริง"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="lastName"
                    name="lastName"
                    label="นามสกุล"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="email"
                    name="email"
                    label="อีเมล"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="userName"
                    name="userName"
                    label="ชื่อผู้ใช้"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="password"
                    name="password"
                    label="รหัสผ่าน"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="phoneNumber"
                    name="phoneNumber"
                    label="เบอร์โทรศัพท์"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <TextboxFormField
                    placeholder="birthDate"
                    name="birthDate"
                    label="วันเกิด"
                    type="date"
                    disabled={false}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <RadioFormField name={""} label={""} options={[]} />
                </Col>
                <Flex style={{ marginTop: "20px" }}>
                  <Button type="primary">ยกเลิก</Button>
                  <Button type="primary">ยืนยัน</Button>
                  <Button type="primary">ลบ</Button>
                </Flex>
              </Row>
            </Row>
          </Form>
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
      </Row>
    </div>
  );
};

export default UsersSingle;
