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

export const UsersSingle = () => {
  const navigate = useNavigate();

  const renderForm = [
    {
      name: ["user", "profile", "firstName"],
      label: "ชื่อจริง",
      placeholder: "กรอกชื่อจริง",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "profile", "lastName"],
      label: "นามสกุล",
      placeholder: "กรอกนามสกุล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "email"],
      label: "อีเมลล์",
      placeholder: "กรอกอีเมลล์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "userName",
      label: "ชื่อผู้ใช้",
      placeholder: "กรอกชื่อผู้ใช้",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "password",
      label: "รหัสผ่าน",
      placeholder: "กรอกรหัสผ่าน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "profix"],
      label: "คำนำหน้า",
      placeholder: "กรอกคำนำหน้า",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "SelectFormField",
      option: [
        { value: "Mr", label: "นาย" },
        { value: "Ms", label: "นาง" },
        { value: "Mrs", label: "นางสาว" },
      ],
    },
    {
      name: "active",
      label: "ทำงานอยู่",
      placeholder: "เลือกทำงานอยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "CheckboxFormField",
    },
    {
      name: "status",
      label: "สถานะ",
      placeholder: "เลือกสถานะ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "CheckboxFormField",
    },
    {
      name: "roleId",
      label: "ตำแหน่ง ไอดี",
      placeholder: "roleId",
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
    {
      name: "type",
      label: "ที่อยู่ที่ลงทะเบียนไว้",
      placeholder: "ที่อยู่ที่ลงทะเบียนไว้",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      label: "เพิ่มเติม",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "description",
      label: "คำอธิบาย",
      placeholder: "คำอธิบาย",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "profile", "phone"],
      label: "เบอร์โทรศัพท์",
      placeholder: "กรอกเบอร์โทรศัพท์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: "photoUrl",
      label: "ลิ้งค์รูปภาพ",
      placeholder: "กอรกคำอธิบาย",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
    },
    {
      name: ["user", "profile", "birthDate"],
      label: "วัน/เดือน/ปีเกิด",
      placeholder: "เลือกวันเกิด",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "DatePickerFormField",
    },
    {
      name: "startWork",
      label: "เริ่มงาน",
      placeholder: "เลือกเริ่มงาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "DatePickerFormField",
    },
    {
      name: "endWork",
      label: "จบงาน",
      placeholder: "เลือกจบงาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "DatePickerFormField",
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
          <Breadcrumb.Item>แก้ไขข้อมูลผู้ใช้</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Typography.Title level={2}>แก้ไขข้อมูลผู้ใช้</Typography.Title>
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
        <Col span={12}>
          <Flex style={{ height: "10%" }} justify="center" align="center">
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
      <Flex style={{ marginTop: "20px", gap: "10px" }}>
        <Button type="primary">ยกเลิก</Button>
        <Button type="primary">ยืนยัน</Button>
        <Button type="primary" danger> ลบ</Button>
      </Flex>
    </div>
  );
};

export default UsersSingle;
