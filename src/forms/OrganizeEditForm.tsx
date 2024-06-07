import { DeleteOutlined, TagFilled } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { useSubmit } from "react-router-dom";
import dayjs from "dayjs";
import React from "react";
import { DynamicForm } from "./Dynamic";

interface OrganizeEditFormProps {
  initialValues?: any;
}

export const OrganizeEditForm: React.FC<OrganizeEditFormProps> = (
  props: OrganizeEditFormProps
) => {
  const { initialValues } = props;
  console.log({ initialValues });

  const [form] = Form.useForm();
  const submit = useSubmit();

  const formatDate = (isoDateString: any) => {
    return dayjs(isoDateString);
  };

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    payload.businessRegister = formatDate(payload.businessRegister);
    payload.active = true;
    payload.addressData = [];
    payload.branchesData = [];
    payload.userData = [];
    payload.descriptions = "-";
    payload.logoUrl =
      "https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&";

    submit(
      { data: JSON.stringify(payload), action: "edit" },
      { method: "put" }
    );
  };

  const onDelete = () => {
    submit({ action: "delete" }, { method: "delete" });
  };

  React.useEffect(() => {
    let businessRegister = null;
    if (initialValues.businessRegister) {
      const combinedDateTime = initialValues.businessRegister;
      businessRegister = dayjs(combinedDateTime);
    }
    form.setFieldsValue({
      ...initialValues,
      businessRegister: businessRegister,
    });
  }, [form, initialValues]);

  const renderForm = [
    {
      name: "active",
      label: "เปิดใช้งาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 4 },
      type: "SwitchFormField",
    },
    {
      name: "businessType",
      label: "รูปแบบธุรกิจ",
      placeholder: "รูปแบบธุรกิจ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "SelectFormField",
      option: [
        { value: "Single", label: "เดี่ยว" },
        { value: "Duo", label: "คู่" },
        { value: "Team", label: "ทีม" },
      ],
    },
    {
      name: "taxId",
      label: "เลขทะเบียน 13 หลัก",
      placeholder: "เลขทะเบียน 13 หลัก",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกข้อมูลเลขทะเบียน 13 หลัก ( เช่น 0123456789101 ) ",
    },
    {
      name: "businessName",
      label: "ชื่อกิจการ",
      placeholder: "ชื่อกิจการ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกชื่อกิจการ",
    },
    {
      name: "businessDescription",
      label: "คำอธิบายธุรกิจ",
      placeholder: "คำอธิบายธุรกิจ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "TextAreaFormField",
      require: true,
    },
    {
      name: "businessRegister",
      label: "วันที่จดทะเบียน",
      placeholder: "วันที่จดทะเบียน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "DatePickerFormField",
    },
    {
      name: "registerVat",
      label: "จดทะเบียนภาษีมูลค่าเพิ่ม",
      placeholder: "จดทะเบียนภาษีมูลค่าเพิ่ม",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "CheckboxFormField",
      // require: true,
    },

    {
      icon: <TagFilled />,
      label: "ข้อมูลช่องทางการติดต่อ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "LabelForm",
    },
    {
      name: "businessPhone",
      label: "เบอร์โทรศัพท์สำนักงาน",
      placeholder: "เบอร์โทรศัพท์สำนักงาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกเบอร์โทรศัพท์สำนักงาน  ",
    },
    {
      name: "businessEmail",
      label: "อีเมลล์สำนักงาน",
      placeholder: "อีเมลล์สำนักงาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: "websiteUrl",
      label: "เว็บไซต์สำนักงาน",
      placeholder: "เว็บไซต์สำนักงาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: "contactPhone",
      label: "เบอร์โทรศัพท์ติดต่อ",
      placeholder: "เบอร์โทรศัพท์ติดต่อ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกเบอร์โทรศัพท์ติดต่อ  ",
    },
    {
      name: "contactEmail",
      label: "อีเมลล์ติดต่อ",
      placeholder: "อีเมลล์ติดต่อ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกอีเมลล์ติดต่อ  ",
    },
    {
      icon: <TagFilled />,
      label: "ข้อมูลตามทะเบียน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "LabelForm",
    },
    {
      name: ["address", "address"],
      label: "ที่อยู่",
      placeholder: "ที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "addressType"],
      label: "ประเภทที่อยู่",
      placeholder: "ประเภทที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "SelectFormField",
      option: [
        { value: "Single", label: "Home" },
        { value: "Duo", label: "Apartment" },
        { value: "Team", label: "Detached House" },
      ],
    },
    {
      name: ["address", "descriptions"],
      label: "คำอธิบายเกี่ยวกับที่อยู่",
      placeholder: "คำอธิบายเกี่ยวกับที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "TextAreaFormField",
    },
    {
      name: "country",
      label: "ประเทศ",
      placeholder: "ประเทศ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "subDistrict"],
      label: "แขวง/ตำบล",
      placeholder: "แขวง/ตำบล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "district"],
      label: "เขต/อำเภอ",
      placeholder: "เขต/อำเภอ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "province"],
      label: "จังหวัด",
      placeholder: "จังหวัด",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกจังหวัด",
    },
    {
      name: ["address", "postalCode"],
      label: "รหัสไปรษณีย์",
      placeholder: "รหัสไปรษณีย์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
      require: true,
      message: "กรุณากรอกรหัสไปรษณีย์",
    },
    {
      icon: <TagFilled />,
      label: "ที่อยู่ตามเอกสาร",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "LabelForm",
    },
    {
      name: "branchType",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "RadioFormField",
      option: [
        { value: "same", label: "ใช้ข้อมูลที่อยู่ตามทะเบียน" },
        { value: "new", label: "ข้อมูลใหม่" },
      ],
    },

    {
      name: ["address", "address"],
      label: "ที่อยู่",
      placeholder: "ที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "addressType"],
      label: "ประเภทที่อยู่",
      placeholder: "ประเภทที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: "SelectFormField",
      option: [
        { value: "Single", label: "Home" },
        { value: "Duo", label: "Apartment" },
        { value: "Team", label: "Detached House" },
      ],
    },
    {
      name: "descriptions",
      label: "คำอธิบายเกี่ยวกับที่อยู่",
      placeholder: "คำอธิบายเกี่ยวกับที่อยู่",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
      type: "TextAreaFormField",
    },
    {
      name: ["address", "country"],
      label: "ประเทศ",
      placeholder: "ประเทศ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "subDistrict"],
      label: "แขวง/ตำบล",
      placeholder: "แขวง/ตำบล",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "district"],
      label: "เขต/อำเภอ",
      placeholder: "เขต/อำเภอ",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "province"],
      label: "จังหวัด",
      placeholder: "จังหวัด",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "postalCode"],
      label: "รหัสไปรษณีย์",
      placeholder: "รหัสไปรษณีย์",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      type: "TextboxFormField",
    },
    {
      name: ["address", "active"],
      label: "เปิดใช้งาน",
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 4 },
      type: "SwitchFormField",
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Col span={12} style={{ textAlign: "left", marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: "bold" }}>
          แก้ไขข้อมูลองค์กร
        </div>
      </Col>
      <Col span={12} style={{ textAlign: "right", marginBottom: 16 }}>
        <Row justify={"end"} gutter={15}>
          <Col>
            <Button onClick={onDelete} icon={<DeleteOutlined />} />
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
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
        <Row gutter={20}>
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
      </Col>
    </Form>
  );
};
