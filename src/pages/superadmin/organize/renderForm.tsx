import { TagFilled } from '@ant-design/icons';

export const renderForm = [
  /*Organize Section*/
  //FIXME:add upload logo url
  {
    label: 'ข้อมูลองค์กร',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },
  {
    name: 'active',
    label: 'เปิดใช้งาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: 'fromType',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'RadioFormField',
    options: [
      { value: 'ordinary_person', label: 'บุคคลธรรมดา' },
      { value: 'juristic_person', label: 'นิติบุคคล' },
    ],
  },
  {
    name: 'nameTh',
    label: 'ชื่อกิจการ (ภาษาไทย)',
    placeholder: 'ชื่อกิจการ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกชื่อกิจการ',
  },
  {
    name: 'nameEn',
    label: 'ชื่อกิจการ (English)',
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
    name: 'type',
    label: 'รูปแบบธุรกิจ',
    placeholder: 'รูปแบบธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'company_limited', label: 'บริษัทจำกัด' },
      { value: 'public_company_limited', label: 'บริษัทมหาชนจำกัด' },
      { value: 'limited_partnership', label: 'ห้างหุ้นส่วนจำกัด' },
      { value: 'foundation', label: 'มูลนิธิ' },
      { value: 'association', label: 'สมาคม' },
      { value: 'joint_venture', label: 'กิจการร่วมค้า' },
      { value: 'others', label: 'อื่นๆ' },
    ],
  },

  {
    name: 'descriptionsTh',
    label: 'คำอธิบายธุรกิจ (ภาษาไทย)',
    placeholder: 'คำอธิบายธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
    require: true,
  },
  {
    name: 'descriptionsEn',
    label: 'คำอธิบายธุรกิจ (English)',
    placeholder: 'คำอธิบายธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
    require: true,
  },

  {
    name: 'openingDate',
    label: 'วันที่จดทะเบียน',
    placeholder: 'วันที่จดทะเบียน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },
  {
    name: 'websiteUrl',
    label: 'เว็ปไซต์สำนักงาน',
    placeholder: 'เว็ปไซต์สำนักงาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'registerVat',
    label: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    placeholder: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: 'status',
    label: 'สถานะธุรกิจ',
    placeholder: 'สถานะธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'newly_registered', label: 'ลูกค้าที่เพิ่งลงทะเบียนใหม่ในระบบ' },
      { value: 'active_user', label: 'ลูกค้าที่ใช้งานอย่างต่อเนื่อง' },
      { value: 'loyal_customer', label: 'ลูกค้าที่มีความภักดีต่อระบบ' },
      { value: 'at_risk', label: 'ลูกค้าที่อาจจะเสี่ยงต่อการหยุดใช้งาน' },
      { value: 'churned', label: 'ลูกค้าที่ได้หยุดใช้บริการหรือยกเลิกบัญชี' },
    ],
  },

  {
    icon: <TagFilled />,
    label: 'ข้อมูลช่องทางการติดต่อ',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },

  {
    name: 'contactPhone',
    label: 'เบอร์โทรศัพท์ติดต่อ',
    placeholder: 'เบอร์โทรศัพท์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    maxLength: 5,
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
    validator: (_: any, value: any) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject('อีเมลล์สำนักงานไม่ถูกต้อง');
      }
    },
  },
  {
    name: 'contactWebsite',
    label: 'เว็บไซต์ติดต่อ',
    placeholder: 'เว็บไซต์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    validator: (_: any, value: any) => {
      if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
          value,
        )
      ) {
        return Promise.reject('เว็บไซต์ติดต่อไม่ถูกต้อง');
      }
    },
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
    name: 'contactFacebook',
    label: 'Facebook',
    placeholder: 'Facebook',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'contactLine',
    label: 'Line ID',
    placeholder: 'line Id',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },

  {
    name: 'contactWhatsapp',
    label: 'WhatsApp',
    placeholder: 'WhatsApp',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'contactNote',
    label: 'ข้อมูลการติดต่อ',
    placeholder: 'ข้อมูลการติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },

  /*Branch Section*/

  //FIXME:add upload logo url
  {
    label: 'เพิ่มสาขา',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'SectionLabelForm',
  },

  {
    name: ['branch', 'active'],
    label: 'เปิดใช้งาน',
    col: { xs: 12, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: ['branch', 'fromType'],
    col: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
    type: 'RadioFormField',
    options: [
      { value: 'ordinary_person', label: 'บุคคลธรรมดา' },
      { value: 'juristic_person', label: 'นิติบุคคล' },
    ],
  },

  {
    name: ['branch', 'nameTh'],
    label: 'ชื่อสาขา (ภาษาไทย)',
    placeholder: 'ชื่อสาขา (ภาษาไทย)',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['branch', 'nameEn'],
    label: 'ชื่อกิจการ (English)',
    placeholder: 'ชื่อกิจการ (English)',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['branch', 'taxId'],
    label: 'เลขทะเบียน 13 หลัก',
    placeholder: 'เลขทะเบียน 13 หลัก',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    maxLength: 13,
    validator: (_: any, value: any) => {
      if (!value) {
        return undefined;
      }
      if (!/^\d{13}$/.test(value)) {
        return Promise.reject('เลขทะเบียน 13 หลักไม่ถูกต้อง');
      }
    },
  },

  {
    name: ['branch', 'type'],
    label: 'รูปแบบธุรกิจ',
    placeholder: 'รูปแบบธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'company_limited', label: 'บริษัทจำกัด' },
      { value: 'public_company_limited', label: 'บริษัทมหาชนจำกัด' },
      { value: 'limited_partnership', label: 'ห้างหุ้นส่วนจำกัด' },
      { value: 'foundation', label: 'มูลนิธิ' },
      { value: 'association', label: 'สมาคม' },
      { value: 'joint_venture', label: 'กิจการร่วมค้า' },
      { value: 'others', label: 'อื่นๆ' },
    ],
  },
  {
    name: ['branch', 'isMain'],
    col: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
    type: 'RadioFormField',
    options: [
      { value: true, label: 'สำนักงานใหญ่' },
      { value: false, label: 'สาขา' },
    ],
  },
  {
    name: ['branch', 'branchCode'],
    label: 'รหัสสาขา',
    placeholder: 'รหัสสาขา',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['branch', 'openingDate'],
    label: 'วันที่จดทะเบียน',
    placeholder: 'วันที่จดทะเบียน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },
  {
    name: ['branch', 'websiteUrl'],
    label: 'เว็ปไซต์สำนักงาน',
    placeholder: 'เว็ปไซต์สำนักงาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['branch', 'registerVat'],
    label: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    placeholder: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: ['branch', 'websiteUrl'],
    label: 'เว็บไซต์',
    placeholder: 'เว็บไซต์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    validator: (_: any, value: any) => {
      if (value === undefined || value === '') {
        return undefined;
      }
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
    name: ['branch', 'contactEmail'],
    label: 'อีเมลติดต่อ',
    placeholder: 'อีเมลล์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    validator: (_: any, value: any) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject('อีเมลล์สำนักงานไม่ถูกต้อง');
      }
    },
  },
  {
    name: ['branch', 'contactPhone'],
    label: 'เบอร์โทรศัพท์ติดต่อ',
    placeholder: 'เบอร์โทรศัพท์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    maxLength: 10,
    type: 'TextboxFormField',
  },

  {
    icon: <TagFilled />,
    label: 'ข้อมูลที่อยู่',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },

  {
    name: ['branch', 'address', 'active'],
    label: 'เปิดใช้งาน',
    col: { xs: 12, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: ['branch', 'address', 'tag'],
    col: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
    type: 'RadioFormField',
    options: [
      { value: 'Headquarters', label: 'สำนักงานใหญ่' },
      { value: 'Branchs', label: 'สาขา' },
    ],
  },

  {
    name: ['branch', 'address', 'address'],
    label: 'ที่อยู่',
    placeholder: 'ที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
  },
  {
    name: ['branch', 'address', 'descriptions'],
    label: 'คำอธิบายเกี่ยวกับที่อยู่',
    placeholder: 'คำอธิบายเกี่ยวกับที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
    require: true,
  },
  {
    name: ['branch', 'address', 'addressType'],
    label: 'ประเภทที่อยู่',
    placeholder: 'ประเภทที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['branch', 'address', 'country'],
    label: 'ประเทศ',
    placeholder: 'ประเทศ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
  },
  {
    name: ['branch', 'address', 'province'],
    label: 'จังหวัด',
    placeholder: 'จังหวัด',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกจังหวัด',
  },
  {
    name: ['branch', 'address', 'district'],
    label: 'เขต/อำเภอ',
    placeholder: 'เขต/อำเภอ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
  },
  {
    name: ['branch', 'address', 'subDistrict'],
    label: 'แขวง/ตำบล',
    placeholder: 'แขวง/ตำบล',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
  },

  {
    name: ['branch', 'address', 'postalCode'],
    label: 'รหัสไปรษณีย์',
    placeholder: 'รหัสไปรษณีย์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกรหัสไปรษณีย์',
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

  /*User Section*/

  //FIXME:add upload image
  {
    label: 'เพิ่มผู้ใช้',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'SectionLabelForm',
  },
  {
    name: ['user', 'email'],
    label: 'อีเมลล์',
    placeholder: 'อีเมลล์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกอีเมลล์',
    validator: (_: any, value: any) => {
      if (value === undefined || value === '') {
        return Promise.reject('');
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject('อีเมลล์ติดต่อไม่ถูกต้อง');
      }
    },
  },
  {
    name: ['user', 'password'],
    label: 'รหัสผ่าน',
    placeholder: 'รหัสผ่าน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['user', 'userName'],
    label: 'ชื่อผู้ใช้',
    placeholder: 'ชื่อผู้ใช้',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกชื่อผู้ใช้',
  },
  {
    name: ['user', 'profile', 'firstName'],
    label: 'ชื่อ',
    placeholder: 'ชื่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกชื่อ',
  },
  {
    name: ['user', 'profile', 'lastName'],
    label: 'นามสกุล',
    placeholder: 'นามสกุล',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกนามสกุล',
  },

  {
    name: ['user', 'profile', 'birthDate'],
    label: 'วันเกิด',
    placeholder: 'วันเกิด',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },
  {
    name: ['user', 'profile', 'phone'],
    label: 'เบอร์โทรศัพท์ติดต่อ',
    placeholder: 'เบอร์โทรศัพท์ติดต่อ ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },

  /*Setting Section*/

  {
    label: 'ตั้งค่า',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'SectionLabelForm',
  },
  {
    name: ['setting', 'active'],
    label: 'เปิดใช้งาน',
    col: { xs: 12, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: ['setting', 'defaultLanguage'],
    label: 'ภาษา',
    placeholder: 'ภาษา',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'TH', label: 'ภาษาไทย' },
      { value: 'EN', label: 'English' },
    ],
  },
  {
    name: ['setting', 'theme'],
    label: 'ธีมสี',
    placeholder: 'ธีมสี',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'light', label: 'สว่าง' },
      { value: 'dark', label: 'มืด' },
    ],
  },
  {
    name: ['setting', 'textDisplay'],
    label: 'ตัวอักษร',
    placeholder: 'ตัวอักษร',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'large', label: 'ขนาดใหญ่' },
      { value: 'normal', label: 'ปกติ' },
      { value: 'small', label: 'ขนาดเล็ก' },
    ],
  },
  {
    name: ['setting', 'domainName'],
    label: 'ชื่อโดเมน',
    placeholder: 'ชื่อโดเมน ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
];

export const renderEditForm = [
  //FIXME:add upload logo url
  {
    label: 'ข้อมูลองค์กร',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },
  {
    name: 'active',
    label: 'เปิดใช้งาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: 'fromType',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'RadioFormField',
    options: [
      { value: 'ordinary_person', label: 'บุคคลธรรมดา' },
      { value: 'juristic_person', label: 'นิติบุคคล' },
    ],
  },
  {
    name: 'nameTh',
    label: 'ชื่อกิจการ (ภาษาไทย)',
    placeholder: 'ชื่อกิจการ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    require: true,
    message: 'กรุณากรอกชื่อกิจการ',
  },
  {
    name: 'nameEn',
    label: 'ชื่อกิจการ (English)',
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
    name: 'type',
    label: 'รูปแบบธุรกิจ',
    placeholder: 'รูปแบบธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'company_limited', label: 'บริษัทจำกัด' },
      { value: 'public_company_limited', label: 'บริษัทมหาชนจำกัด' },
      { value: 'limited_partnership', label: 'ห้างหุ้นส่วนจำกัด' },
      { value: 'foundation', label: 'มูลนิธิ' },
      { value: 'association', label: 'สมาคม' },
      { value: 'joint_venture', label: 'กิจการร่วมค้า' },
      { value: 'others', label: 'อื่นๆ' },
    ],
  },

  {
    name: 'descriptionsTh',
    label: 'คำอธิบายธุรกิจ (ภาษาไทย)',
    placeholder: 'คำอธิบายธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
    require: true,
  },
  {
    name: 'descriptionsEn',
    label: 'คำอธิบายธุรกิจ (English)',
    placeholder: 'คำอธิบายธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextAreaFormField',
    require: true,
  },

  {
    name: 'openingDate',
    label: 'วันที่จดทะเบียน',
    placeholder: 'วันที่จดทะเบียน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },
  {
    name: 'websiteUrl',
    label: 'เว็ปไซต์สำนักงาน',
    placeholder: 'เว็ปไซต์สำนักงาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'registerVat',
    label: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    placeholder: 'จดทะเบียนภาษีมูลค่าเพิ่ม',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SwitchFormField',
  },
  {
    name: 'status',
    label: 'สถานะธุรกิจ',
    placeholder: 'สถานะธุรกิจ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'newly_registered', label: 'ลูกค้าที่เพิ่งลงทะเบียนใหม่ในระบบ' },
      { value: 'active_user', label: 'ลูกค้าที่ใช้งานอย่างต่อเนื่อง' },
      { value: 'loyal_customer', label: 'ลูกค้าที่มีความภักดีต่อระบบ' },
      { value: 'at_risk', label: 'ลูกค้าที่อาจจะเสี่ยงต่อการหยุดใช้งาน' },
      { value: 'churned', label: 'ลูกค้าที่ได้หยุดใช้บริการหรือยกเลิกบัญชี' },
    ],
  },

  {
    icon: <TagFilled />,
    label: 'ข้อมูลช่องทางการติดต่อ',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'LabelForm',
  },

  {
    name: 'contactPhone',
    label: 'เบอร์โทรศัพท์ติดต่อ',
    placeholder: 'เบอร์โทรศัพท์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    maxLength: 5,
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
    validator: (_: any, value: any) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return Promise.reject('อีเมลล์สำนักงานไม่ถูกต้อง');
      }
    },
  },
  {
    name: 'contactWebsite',
    label: 'เว็บไซต์ติดต่อ',
    placeholder: 'เว็บไซต์ติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    validator: (_: any, value: any) => {
      if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
          value,
        )
      ) {
        return Promise.reject('เว็บไซต์ติดต่อไม่ถูกต้อง');
      }
    },
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
    name: 'contactFacebook',
    label: 'Facebook',
    placeholder: 'Facebook',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'contactLine',
    label: 'Line ID',
    placeholder: 'line Id',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },

  {
    name: 'contactWhatsapp',
    label: 'WhatsApp',
    placeholder: 'WhatsApp',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'contactNote',
    label: 'ข้อมูลการติดต่อ',
    placeholder: 'ข้อมูลการติดต่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
];
