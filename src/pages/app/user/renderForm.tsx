export const renderForm = [
  {
    label: 'ข้อมูลผู้ใช้',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'SectionLabelForm',
  },
  {
    label: 'รูปภาพ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'UploadFile',
  },
  {
    name: 'active',
    label: 'เปิดใช้งาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'ActiveCard',
    title: 'เปิดใช้งาน',
    description: 'ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน',
    rule: [{ required: true, message: 'กรุณาเลือกเปิดปิดการใช้งาน!' }],
  },

  {
    name: 'email',
    label: 'อีเมล',
    placeholder: 'อีเมล',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    rule: [
      { required: true, message: 'กรุณากรอกอีเมล!' },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'กรุณากรอกอีเมลที่ถูกต้อง!',
      },
    ],
  },
  {
    name: 'userName',
    label: 'ชื่อผู้ใช้',
    placeholder: 'ชื่อผู้ใช้',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: 'password',
    label: 'รหัสผ่าน',
    placeholder: 'รหัสผ่าน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    rule: [{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }],
  },

  {
    name: 'roleId',
    label: 'ตำแหน่ง',
    placeholder: 'เลือกตำแหน่ง',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: '3e1bcf2b-3bb3-4d7d-949f-f86911a47e14', label: 'พนักงาน' },
      { value: '11853391-5fbc-4dea-8fb6-b4720aec4585', label: 'ผู้จัดการ' },
      { value: 'bcdb3790-5657-497d-8132-f82acd3f52ef', label: 'เจ้าของกิจการ' },
    ],
    rule: [{ required: true, message: 'กรุณาเลือกตำแหน่ง!' }],
  },

  {
    name: ['profile', 'prefix'],
    label: 'คำนำหน้า',
    placeholder: 'เลือกคำนำหน้า',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'Mr.', label: 'นาย' },
      { value: 'Mrs.', label: 'นาง' },
      { value: 'Miss', label: 'นางสาว' },
    ],
  },
  {
    name: ['profile', 'firstName'],
    label: 'ชื่อ',
    placeholder: 'ชื่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    rule: [{ required: true, message: 'กรุณากรอกชื่อจริง!' }],
  },
  {
    name: ['profile', 'lastName'],
    label: 'นามสกุล',
    placeholder: 'นามสกุล',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['profile', 'birthDate'],
    label: 'วัน/เดือน/ปีเกิด',
    placeholder: 'เลือกวันเกิด',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },

  {
    name: ['profile', 'phone'],
    label: 'เบอร์โทรศัพท์',
    placeholder: 'เบอร์โทรศัพท์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
];

export const renderEditForm = [
  {
    label: 'ข้อมูลผู้ใช้',
    col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    type: 'SectionLabelForm',
  },
  {
    label: 'รูปภาพ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'UploadFile',
  },
  {
    name: 'active',
    label: 'เปิดใช้งาน',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'ActiveCard',
    title: 'เปิดใช้งาน',
    description: 'ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน',
    rule: [{ required: true, message: 'กรุณาเลือกเปิดปิดการใช้งาน!' }],
  },

  {
    name: 'roleId',
    label: 'ตำแหน่ง',
    placeholder: 'เลือกตำแหน่ง',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: '3e1bcf2b-3bb3-4d7d-949f-f86911a47e14', label: 'พนักงาน' },
      { value: '11853391-5fbc-4dea-8fb6-b4720aec4585', label: 'ผู้จัดการ' },
      { value: 'bcdb3790-5657-497d-8132-f82acd3f52ef', label: 'เจ้าของกิจการ' },
    ],
    rule: [{ required: true, message: 'กรุณาเลือกตำแหน่ง!' }],
  },

  {
    name: ['profile', 'prefix'],
    label: 'คำนำหน้า',
    placeholder: 'เลือกคำนำหน้า',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    options: [
      { value: 'Mr.', label: 'นาย' },
      { value: 'Mrs.', label: 'นาง' },
      { value: 'Miss', label: 'นางสาว' },
    ],
  },
  {
    name: ['profile', 'firstName'],
    label: 'ชื่อ',
    placeholder: 'ชื่อ',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
    rule: [{ required: true, message: 'กรุณากรอกชื่อจริง!' }],
  },
  {
    name: ['profile', 'lastName'],
    label: 'นามสกุล',
    placeholder: 'นามสกุล',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
  {
    name: ['profile', 'birthDate'],
    label: 'วัน/เดือน/ปีเกิด',
    placeholder: 'เลือกวันเกิด',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'DatePickerFormField',
  },

  {
    name: ['profile', 'phone'],
    label: 'เบอร์โทรศัพท์',
    placeholder: 'เบอร์โทรศัพท์',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'TextboxFormField',
  },
];
