import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { TagFilled } from '@ant-design/icons';
interface IRenderForm {
  name?: string | string[];
  label?: string;
  col?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  type?: string;
  placeholder?: string;
  require?: boolean;
  message?: string;
  option?: { value: string; label: string }[];
  maxLength?: number;
  validator?: any;
  icon?: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >;
}

export const renderForm: IRenderForm[] = [
  {
    label: 'แก้ไขข้อมูลองค์กร',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },
  {
    name: 'active',
    label: 'เปิดใช้งาน',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'SwitchFormField',
  },
  {
    name: 'businessNameTH',
    label: 'ชื่อกิจการ',
    placeholder: 'ชื่อกิจการ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกชื่อกิจการ',
  },
  {
    name: 'taxId',
    label: 'เลขทะเบียน 13 หลัก',
    placeholder: 'เลขทะเบียน 13 หลัก',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกข้อมูลเลขทะเบียน 13 หลัก ( เช่น 0123456789101 ) ',
  },

  {
    name: 'businessDescriptionTH',
    label: 'คำอธิบายธุรกิจ',
    placeholder: 'คำอธิบายธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
    require: true,
  },
  {
    name: 'businessTypeTH',
    label: 'รูปแบบธุรกิจ',
    placeholder: 'รูปแบบธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    option: [
      { value: 'Single', label: 'เดี่ยว' },
      { value: 'Duo', label: 'คู่' },
      { value: 'Team', label: 'ทีม' },
    ],
  },
  {
    name: 'taxId',
    label: 'เลขทะเบียน 13 หลัก',
    placeholder: 'เลขทะเบียน 13 หลัก',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกข้อมูลเลขทะเบียน 13 หลัก ( เช่น 0123456789101 ) ',
    maxLength: 13,
    validator: (_: any, value: any) => {
      if (!value) {
        return Promise.reject('');
      }
      if (!/^\d{13}$/.test(value)) {
        return Promise.reject('เลขทะเบียน 13 หลักไม่ถูกต้อง');
      }
    },
  },
  {
    name: 'businessRegister',
    label: 'วันที่จดทะเบียน',
    placeholder: 'วันที่จดทะเบียน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },
  {
    name: 'registerVat',
    label: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    placeholder: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
    // require: true,
  },

  {
    icon: TagFilled,
    label: 'ข้อมูลช่องทางการติดต่อ',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },
  {
    name: 'businessPhone',
    label: 'เบอร์โทรศัพท์สำนักงาน',
    placeholder: 'เบอร์โทรศัพท์สำนักงาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกเบอร์โทรศัพท์สำนักงาน  ',
  },
  {
    name: 'contactPhone',
    label: 'เบอร์โทรศัพท์ติดต่อ',
    placeholder: 'เบอร์โทรศัพท์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกเบอร์โทรศัพท์ติดต่อ  ',
  },
  {
    name: 'contactEmail',
    label: 'อีเมลล์ติดต่อ',
    placeholder: 'อีเมลล์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกอีเมลล์ติดต่อ  ',
  },
  {
    name: 'businessEmail',
    label: 'อีเมลล์สำนักงาน',
    placeholder: 'อีเมลล์สำนักงาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    validator: (_: any, value: any) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject('อีเมลล์สำนักงานไม่ถูกต้อง');
      }
    },
  },
  {
    name: 'websiteUrl',
    label: 'เว็บไซต์สำนักงาน',
    placeholder: 'เว็บไซต์สำนักงาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    validator: (_: any, value: any) => {
      if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
          value,
        )
      ) {
        return Promise.reject('เว็บไซต์สำนักงานไม่ถูกต้อง');
      }
    },
  },
  {
    icon: TagFilled,
    label: 'ที่อยู่ตามเอกสาร',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },
  {
    name: 'branchType',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'RadioFormField',
    option: [
      { value: 'same', label: 'ใช้ข้อมูลที่อยู่ตามทะเบียน' },
      { value: 'new', label: 'ข้อมูลใหม่' },
    ],
  },
  {
    name: ['addresses', 'address'],
    label: 'ที่อยู่',
    placeholder: 'ที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'descriptions',
    label: 'คำอธิบายเกี่ยวกับที่อยู่',
    placeholder: 'คำอธิบายเกี่ยวกับที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
  },
  {
    name: ['addresses', 'country'],
    label: 'ประเทศ',
    placeholder: 'ประเทศ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['addresses', 'addressType'],
    label: 'ประเภทที่อยู่',
    placeholder: 'ประเภทที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    option: [
      { value: 'Single', label: 'Home' },
      { value: 'Duo', label: 'Apartment' },
      { value: 'Team', label: 'Detached House' },
    ],
  },
  {
    name: ['addresses', 'subDistrict'],
    label: 'แขวง/ตำบล',
    placeholder: 'แขวง/ตำบล',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['addresses', 'district'],
    label: 'เขต/อำเภอ',
    placeholder: 'เขต/อำเภอ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['addresses', 'province'],
    label: 'จังหวัด',
    placeholder: 'จังหวัด',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['addresses', 'postalCode'],
    label: 'รหัสไปรษณีย์',
    placeholder: 'รหัสไปรษณีย์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    maxLength: 5,
    validator: (_: any, value: any) => {
      if (value === undefined || value === '') {
        return undefined;
      }
      if (!/^[0-9]{5}$/i.test(value)) {
        return Promise.reject('รหัสไปรษณีย์ไม่ถูกต้อง');
      }
    },
  },
  {
    name: ['addresses', 'active'],
    label: 'เปิดใช้งาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 24 },
    type: 'SwitchFormField',
  },
];
