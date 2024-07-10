import React from "react";

import * as API from "@src/apis";
import {  Col, Form, Row } from "antd";

import { DynamicForm } from "@src/forms/Dynamic";
import {  TagFilled } from "@ant-design/icons";
import { useNavigate, useSubmit } from "react-router-dom";
import { FormButtonsCreate } from "@src/components/shared/FormButtons";


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
    label: "ข้อมูลองค์กร",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "LabelForm",
  },
  {
    name: "active",
    label: "เปิดใช้งาน",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "SwitchFormField",
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
    name: "taxId",
    label: "เลขทะเบียน 13 หลัก",
    placeholder: "เลขทะเบียน 13 หลัก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกข้อมูลเลขทะเบียน 13 หลัก ( เช่น 0123456789101 ) ",
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
    maxLength: 13,
    validator: (_: any, value: any) => {
      if (!value) {
        return Promise.reject("");
      }
      if (!/^\d{13}$/.test(value)) {
        return Promise.reject("เลขทะเบียน 13 หลักไม่ถูกต้อง");
      }
    }
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
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SwitchFormField",
    // require: true,
  },


  {
    icon: <TagFilled />,
    label: "ข้อมูลช่องทางการติดต่อ",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "LabelForm",
  },
  {
    name: "businessPhone",
    label: "เบอร์โทรศัพท์สำนักงาน",
    placeholder: "เบอร์โทรศัพท์สำนักงาน",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกเบอร์โทรศัพท์สำนักงาน  ",
  },
  {
    name: "contactPhone",
    label: "เบอร์โทรศัพท์ติดต่อ",
    placeholder: "เบอร์โทรศัพท์ติดต่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกเบอร์โทรศัพท์ติดต่อ  ",
  },
  {
    name: "contactEmail",
    label: "อีเมลล์ติดต่อ",
    placeholder: "อีเมลล์ติดต่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกอีเมลล์ติดต่อ  ",
  },
  {
    name: "businessEmail",
    label: "อีเมลล์สำนักงาน",
    placeholder: "อีเมลล์สำนักงาน",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    validator: (_: any, value: any) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject("อีเมลล์สำนักงานไม่ถูกต้อง");
      }
    }
  },
  {
    name: "websiteUrl",
    label: "เว็บไซต์สำนักงาน",
    placeholder: "เว็บไซต์สำนักงาน",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    validator: (_: any, value: any) => {
      if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)) {
        return Promise.reject("เว็บไซต์สำนักงานไม่ถูกต้อง");
      }
    }
  },
  {
    name: "contactPhone",
    label: "เบอร์โทรศัพท์ติดต่อ",
    placeholder: "เบอร์โทรศัพท์ติดต่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกเบอร์โทรศัพท์ติดต่อ  ",
    maxLength: 10,
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return Promise.reject("");
      }
      // if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{10}$/.test(value)) {
      if (!/^(06|08)[0-9]{8}$/.test(value)) {
        return Promise.reject("เบอร์โทรศัพท์ติดต่อไม่ถูกต้อง");
      }
    }
  },
  {
    name: "contactEmail",
    label: "อีเมลล์ติดต่อ",
    placeholder: "อีเมลล์ติดต่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกอีเมลล์ติดต่อ  ",
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return Promise.reject("");
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject("อีเมลล์ติดต่อไม่ถูกต้อง");
      }
    }
  },
  {
    icon: <TagFilled />,
    label: "ข้อมูลที่อยู่ตามทะเบียน",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "LabelForm",
  },
  {
    name: ["address", "address"],
    label: "ที่อยู่",
    placeholder: "ที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["address", "addressType"],
    label: "ประเภทที่อยู่",
    placeholder: "ประเภทที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SelectFormField",
    require: true,
    option: [
      { value: "Single", label: "Home" },
      { value: "Duo", label: "Apartment" },
      { value: "Team", label: "Detached House" },
    ],
  },
  
  {
    name: ["address", "subDistrict"],
    label: "แขวง/ตำบล",
    placeholder: "แขวง/ตำบล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["address", "district"],
    label: "เขต/อำเภอ",
    placeholder: "เขต/อำเภอ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["address", "province"],
    label: "จังหวัด",
    placeholder: "จังหวัด",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกจังหวัด",
  },
  {
    name: ["address", "postalCode"],
    label: "รหัสไปรษณีย์",
    placeholder: "รหัสไปรษณีย์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกรหัสไปรษณีย์",
    maxLength: 5,
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return Promise.reject("");
      }
      if (!/^[0-9]{5}$/i.test(value)) {
        return Promise.reject("รหัสไปรษณีย์ไม่ถูกต้อง");
      }
    },
  },
  {
    name: "country",
    label: "ประเทศ",
    placeholder: "ประเทศ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    icon: <TagFilled />,
    label: "ข้อมูลที่อยู่ตามเอกสาร",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "LabelForm",
  },

  {
    name: "branchType",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "RadioFormField",

    options: [
      { value: "same", label: "ใช้ข้อมูลที่อยู่ตามทะเบียน", checked: true },
      { value: "new", label: "ข้อมูลใหม่" },
    ],
  },

  {
    name: ["address", "address"],
    label: "ที่อยู่",
    placeholder: "ที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    disabled: true,
  },
  {
    name: ["address", "descriptions"],
    label: "คำอธิบายเกี่ยวกับที่อยู่",
    placeholder: "คำอธิบายเกี่ยวกับที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextAreaFormField",
    disabled: true,
  },
  {
    name: ["address", "country"],
    label: "ประเทศ",
    placeholder: "ประเทศ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    disabled: true,
  },
  {
    name: ["address", "addressType"],
    label: "ประเภทที่อยู่",
    placeholder: "ประเภทที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SelectFormField",
    options: [
      { value: "Single", label: "Home" },
      { value: "Duo", label: "Apartment" },
      { value: "Team", label: "Detached House" },
    ],
    disabled: true,
  },
  {
    name: ["address", "subDistrict"],
    label: "แขวง/ตำบล",
    placeholder: "แขวง/ตำบล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    disabled: true,
  },
  {
    name: ["address", "district"],
    label: "เขต/อำเภอ",
    placeholder: "เขต/อำเภอ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    disabled: true,
  },
  {
    name: ["address", "province"],
    label: "จังหวัด",
    placeholder: "จังหวัด",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    disabled: true,
  },
  {
    name: ["address", "postalCode"],
    label: "รหัสไปรษณีย์",
    placeholder: "รหัสไปรษณีย์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    disabled: true,
  },
  {
    name: ["address", "active"],
    label: "เปิดใช้งาน",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
    type: "SwitchFormField",
    disabled: true,
    checked: true,
  },
  /*Branch Section*/
  {
    label: "เพิ่มสาขา",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
    type: "SectionLabelForm",
  },
  {
    name: ["branch", "taxId"],
    label: "เลขทะเบียน 13 หลัก",
    placeholder: "เลขทะเบียน 13 หลัก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    maxLength: 13,
    validator: (_: any, value: any) => {
      if (!value) {
        return undefined;
      }
      if (!/^\d{13}$/.test(value)) {
        return Promise.reject("เลขทะเบียน 13 หลักไม่ถูกต้อง");
      }
    }
  },
  {
    name: ["branch", "businessName"],
    label: "ชื่อกิจการ",
    placeholder: "ชื่อกิจการ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "taxId"],
    label: "เลขทะเบียน 13 หลัก",
    placeholder: "เลขทะเบียน 13 หลัก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "branchType"],
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "RadioFormField",
    options: [
      { value: "headquarters", label: "สำนักงานใหญ่", checked: true },
      { value: "branch", label: "สาขา" },
    ],
  },
  {
    name: ["branch", "businessType"],
    label: "รูปแบบธุรกิจ",
    placeholder: "รูปแบบธุรกิจ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SelectFormField",
    options: [
      { value: "Single", label: "เดี่ยว" },
      { value: "Duo", label: "คู่" },
      { value: "Team", label: "ทีม" },
    ],
  },
  {
    name: ["branch", "businessModel"],
    label: "โมเดล",
    placeholder: "โมเดล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    maxLength: 10,
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return undefined;
      }
      if (!/^(06|08)[0-9]{8}$/.test(value)) {
        return Promise.reject("เบอร์โทรศัพท์ติดต่อไม่ถูกต้อง");
      }
    }
  },
  {
    name: ["branch", "email"],
    label: "อีเมลล์",
    placeholder: "อีเมลล์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "phone"],
    label: "เบอร์โทรศัพท์ติดต่อ",
    placeholder: "เบอร์โทรศัพท์ติดต่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["branch", "websiteUrl"],
    label: "เว็บไซต์",
    placeholder: "เว็บไซต์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return undefined;
      }
      if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)) {
        return Promise.reject("เว็บไซต์สำนักงานไม่ถูกต้อง");
      }
    }
  },
  {
    icon: <TagFilled />,
    label: "ข้อมูลที่อยู่",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "LabelForm",
  },
  {
    name: ["branch", "address", "address"],
    label: "ที่อยู่",
    placeholder: "ที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["branch", "address", "descriptions"],
    label: "คำอธิบายเกี่ยวกับที่อยู่",
    placeholder: "คำอธิบายเกี่ยวกับที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextAreaFormField",
    require: true,
  },
  {
    name: ["branch", "address", "country"],
    label: "ประเทศ",
    placeholder: "ประเทศ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["branch", "address", "addressType"],
    label: "ประเภทที่อยู่",
    placeholder: "ประเภทที่อยู่",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SelectFormField",
    require: true,
    options: [
      { value: "Single", label: "Home" },
      { value: "Duo", label: "Apartment" },
      { value: "Team", label: "Detached House" },
    ],
  },
  {
    name: ["branch", "address", "subDistrict"],
    label: "แขวง/ตำบล",
    placeholder: "แขวง/ตำบล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["branch", "address", "district"],
    label: "เขต/อำเภอ",
    placeholder: "เขต/อำเภอ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
  },
  {
    name: ["branch", "address", "province"],
    label: "จังหวัด",
    placeholder: "จังหวัด",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกจังหวัด",
  },
  {
    name: ["branch", "address", "postalCode"],
    label: "รหัสไปรษณีย์",
    placeholder: "รหัสไปรษณีย์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกรหัสไปรษณีย์",
    maxLength: 5,
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return undefined;
      }
      if (!/^[0-9]{5}$/i.test(value)) {
        return Promise.reject("รหัสไปรษณีย์ไม่ถูกต้อง");
      }
    },
  },
  {
    name: ["branch", "address", "active"],
    label: "เปิดใช้งาน",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "SwitchFormField",
  },
  //User Section
  {
    label: "เพิ่มผู้ใช้",
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: "SectionLabelForm",
  },
  {
    name: ["user", "profix"],
    label: "คำนำหน้า",
    placeholder: "คำนำหน้า",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SelectFormField",
    options: [
      { value: "Mr", label: "นาย" },
      { value: "Ms", label: "นาง" },
      { value: "Mrs", label: "นางสาว" },
    ],
  },
  {
    name: ["user", "profile", "firstName"],
    label: "ชื่อ",
    placeholder: "ชื่อ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกชื่อ",
  },
  {
    name: ["user", "profile", "lastName"],
    label: "นามสกุล",
    placeholder: "นามสกุล",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกนามสกุล",
  },
  {
    name: ["user", "email"],
    label: "อีเมลล์",
    placeholder: "อีเมลล์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกอีเมลล์",
    validator: (_: any, value: any) => {
      if (value === undefined || value === "") {
        return Promise.reject("");
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject("อีเมลล์ติดต่อไม่ถูกต้อง");
      }
    }
  },
  {
    name: "userName",
    label: "ชื่อผู้ใช้",
    placeholder: "ชื่อผู้ใช้",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณากรอกชื่อผู้ใช้",
  },
  {
    name: ["user", "email"],
    label: "อีเมลล์",
    placeholder: "อีเมลล์",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
    require: true,
    message: "กรุณาอีเมลล์",
  },
  
  {
    name: ["user", "password"],
    label: "รหัสผ่าน",
    placeholder: "รหัสผ่าน",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: "organizationId",
    label: "เลของค์กร",
    placeholder: "เลของค์กร",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: "role",
    label: "ตำแหน่ง",
    placeholder: "เลือก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "SelectFormField",
    options: [
      { value: "SuperAdmin", label: "Super Admin" },
      { value: "Admin", label: "Admin" },
      { value: "User", label: "User" },
    ],
  },
  {
    name: ["user", "profile", "discordGuid"],
    label: "ดิสคอร์ดไอดี",
    placeholder: "ดิสคอร์ดไอดี",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "deviceToken"],
    label: "Device Token",
    placeholder: "Device Token",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "phone"],
    label: "เบอร์โทรศัพท์ติดต่อ",
    placeholder: "เบอร์โทรศัพท์ติดต่อ ",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "TextboxFormField",
  },
  {
    name: ["user", "profile", "birthDate"],
    label: "วัน/เดือน/ปีเกิด",
    placeholder: "เลือก",
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: "DatePickerFormField",
  },
  
];

export const OrganizeCreate: React.FC = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  //get me from local Storage
  const me = JSON.parse(localStorage.getItem("me") as any);
  const navigate = useNavigate();
  //check path by role
  React.useEffect(() => {
    if (me.role === "user" || me.role === "admin") {
      navigate("/");
    }
  }, []);

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    payload.active = true;
    payload.user.active = true;
    payload.branch.branchType = "branch";

    payload.logoUrl =
      "https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&";
    payload.branch.logoUrl =
      "https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&";

    console.log(payload);

    submit({ data: JSON.stringify(payload) }, { method: "post" });
  };
  function handleFinish(_values: any): void {
    throw new Error("Function not implemented.");
  }
  return (
    <>
    <FormButtonsCreate form={form} onFinish={handleFinish} />
      <Form form={form} layout="vertical" onFinish={onFinish}>
      <div style={{ padding: "20px" }}>
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div style={{ fontSize: 22, fontWeight: "bold" }}></div>
      <Col
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        md={{ span: 24, order: 2 }}
        lg={{ span: 12, order: 2 }}
        xl={{ span: 12, order: 1 }}
      >
        <Row gutter={20}>
          
          <Col span={24} style={{ textAlign: "left", marginBottom: 16 }}></Col>

          {renderForm.map((item: any, index: number) => {
            return (
              <DynamicForm
                key={index}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                col={item.col}
                icon={item.icon}
                value={item.value}
                ruleMessage={item.message}
                require={item.require}
                option={item.options}
                disabled={item.disabled}
                checked={item.checked}
                maxLength={item.maxLength}
                validator={item.validator}
              />
            );
          })}
         </Row>
      </Col>
      </Form>
    </div>
    </Form>
    </>
  );
};
