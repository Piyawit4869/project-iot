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
