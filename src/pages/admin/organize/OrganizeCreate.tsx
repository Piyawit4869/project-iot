import React from "react";

import * as API from "@src/apis";
import { Button, Col, Form, Row } from "antd";

import { DynamicForm } from "@src/forms/Dynamic";
import { TagFilled } from "@ant-design/icons";
import { useSubmit } from "react-router-dom";

export async function organizeCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    await API.organize.create(JSON.parse(submitData.data));
    return {
      data: {
        action: "create",
        status: "success",
        message: "Organize Created Successfully !",
      },
    };
  } catch (error) {
    return {
      data: {
        action: "create",
        status: "error",
        message: "Organize Created Failed !",
      },
    };
  }
}

const renderForm = [
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
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
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
    name: "address",
    label: "ที่อยู่",
    placeholder: "ที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "addressType",
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
    name: "country",
    label: "ประเทศ",
    placeholder: "ประเทศ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "subDistrict",
    label: "แขวง/ตำบล",
    placeholder: "แขวง/ตำบล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "district",
    label: "เขต/อำเภอ",
    placeholder: "เขต/อำเภอ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "province",
    label: "จังหวัด",
    placeholder: "จังหวัด",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกจังหวัด",
  },
  {
    name: "postalCode",
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
    name: "address",
    label: "ที่อยู่",
    placeholder: "ที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "addressType",
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
    name: "country",
    label: "ประเทศ",
    placeholder: "ประเทศ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "subDistrict",
    label: "แขวง/ตำบล",
    placeholder: "แขวง/ตำบล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "district",
    label: "เขต/อำเภอ",
    placeholder: "เขต/อำเภอ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "province",
    label: "จังหวัด",
    placeholder: "จังหวัด",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "postalCode",
    label: "รหัสไปรษณีย์",
    placeholder: "รหัสไปรษณีย์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },

  //Branch Section
  {
    label: "เพิ่มสาขา",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
    type: "LabelForm",
  },
  {
    name: ["branch", "taxId"],
    label: "เลขทะเบียน 13 หลัก",
    placeholder: "เลขทะเบียน 13 หลัก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "businessName"],
    label: "ชื่อกิจการ",
    placeholder: "ชื่อกิจการ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: "branchType",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
    type: "RadioFormField",
    option: [
      { value: "headquarters", label: "สำนักงานใหญ่" },
      { value: "branch", label: "สาขา" },
    ],
  },
  {
    name: "bussinessModel",
    label: "โมเดล",
    placeholder: "โมเดล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "businessType"],
    label: "รูปแบบธุรกิจ",
    placeholder: "รูปแบบธุรกิจ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "SelectFormField",
    option: [
      { value: "Single", label: "เดี่ยว" },
      { value: "Duo", label: "คู่" },
      { value: "Team", label: "ทีม" },
    ],
  },
  {
    name: "phone",
    label: "เบอร์โทรศัพท์",
    placeholder: "เบอร์โทรศัพท์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "email",
    label: "อีเมลล์",
    placeholder: "อีเมลล์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "websiteUrl"],
    label: "เว็บไซต์",
    placeholder: "เว็บไซต์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 16 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "address"],
    label: "ที่อยู่",
    placeholder: "ที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 16 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "addressType"],
    label: "ประเภทที่อยู่",
    placeholder: "ประเภทที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "SelectFormField",
    option: [
      { value: "Single", label: "Home" },
      { value: "Duo", label: "Apartment" },
      { value: "Team", label: "Detached House" },
    ],
  },
  {
    name: ["branch", "descriptions"],
    label: "คำอธิบายเกี่ยวกับที่อยู่",
    placeholder: "คำอธิบายเกี่ยวกับที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextAreaFormField",
  },
  {
    name: ["branch", "country"],
    label: "ประเทศ",
    placeholder: "ประเทศ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "subDistrict"],
    label: "แขวง/ตำบล",
    placeholder: "แขวง/ตำบล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "district"],
    label: "เขต/อำเภอ",
    placeholder: "เขต/อำเภอ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "province"],
    label: "จังหวัด",
    placeholder: "จังหวัด",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "postalCode"],
    label: "รหัสไปรษณีย์",
    placeholder: "รหัสไปรษณีย์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  //User Section
  {
    label: "เพิ่มผู้ใช้",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
    type: "LabelForm",
  },
  {
    name: ["user", "email"],
    label: "อีเมลล์",
    placeholder: "อีเมลล์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "userName",
    label: "ชื่อผู้ใช้",
    placeholder: "ชื่อผู้ใช้",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "password",
    label: "รหัสผ่าน",
    placeholder: "รหัสผ่าน",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "organizationId",
    label: "เลของค์กร",
    placeholder: "เลของค์กร",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profix"],
    label: "คำนำหน้า",
    placeholder: "คำนำหน้า",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "SelectFormField",
    option: [
      { value: "Mr", label: "นาย" },
      { value: "Ms", label: "นาง" },
      { value: "Mrs", label: "นางสาว" },
    ],
  },
  {
    name: ["user", "profile", "firstName"],
    label: "ชื่อ",
    placeholder: "ชื่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "lastName"],
    label: "นามสกุล",
    placeholder: "นามสกุล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "birthDate"],
    label: "วัน/เดือน/ปีเกิด",
    placeholder: "เลือก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "DatePickerFormField",
  },
  {
    name: ["user", "profile", "discordGuid"],
    label: "ดิสคอร์ดไอดี",
    placeholder: "ดิสคอร์ดไอดี",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "deviceToken"],
    label: "Device Token",
    placeholder: "Device Token",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "phone"],
    label: "โทรศัพท์",
    placeholder: "โทรศัพท์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "TextboxFormField",
  },
  {
    name: "role",
    label: "ตำแหน่ง",
    placeholder: "เลือก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
    type: "SelectFormField",
    option: [
      { value: "SuperAdmin", label: "Super Admin" },
      { value: "Admin", label: "Admin" },
      { value: "User", label: "User" },
    ],
  },
];

export const OrganizeCreate: React.FC = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();
  // const [imageSrc, setImageSrc] = React.useState("image-placeholder.png");

  // const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target;
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImageSrc(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // };
  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    submit({ data: JSON.stringify(payload) }, { method: "post" });
  };

  // const formatDate = (isoDateString: any) => {
  //   return dayjs(isoDateString);
  // };

  // Loop through the keys of the JSON object
  // for (const key in FormTitleJson) {
  //   console.log(FormTitleJson.hasOwnProperty(key));

  //   if (FormTitleJson.hasOwnProperty(key)) {
  //     Forms.push(
  // <DynamicForm
  //   LabelFormIcon={<TagFilled />}
  //   LabelFormStyle={undefined}
  //   LabelFormLabel={key}
  //   LabelFormChildren={undefined}
  //   TextboxFormPlaceholder={key}
  //   TextboxFormName={key}
  //   TextboxFormLabel={key}
  //   IsObject={false}
  //   TextboxFormValue={key}
  // />
  //     );
  //     // console.log(`Key: ${key}, Value: ${FormTitleJson[key]}`);
  //   }
  // }

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Col span={24} style={{ textAlign: "right", marginBottom: 16 }}>
          <Button style={{ margin: "10px" }} htmlType="reset">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
        <Row gutter={20}>
          <Col span={24} style={{ textAlign: "left", marginBottom: 16 }}>
            <div style={{ fontSize: 22, fontWeight: "bold" }}>
              เพิ่มข้อมูลองค์กร
            </div>
          </Col>

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

        {/* <OrganizeCreateForm />
        <BranchForm />
        <UserForm /> */}
      </Form>
    </div>
  );
};
