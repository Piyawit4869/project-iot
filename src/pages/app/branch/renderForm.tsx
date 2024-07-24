import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
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
      name: 'active',
      label: 'ทำงานอยู่',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'SwitchFormField',
  },
    {
      name: 'isMain',
      label: 'หลัก',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'SwitchFormField',
  },
   {
      label: 'ข้อมูลสาขา',
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: 'LabelForm',
  },
          {
      name: 'branchCode',
      label: 'เลขสาขา',
      placeholder: 'เลขสาขา',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
  },
     {
      name: 'fromType',
      label: 'ประเภท',
      placeholder: 'ประเภท',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
      {
      name: 'taxId',
      label: 'เลขไอดี',
      placeholder: 'กรอกเลขไอดี',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
  },
    
   {
    name: ['type'],
    label: 'ประเภท',
    placeholder: 'ประเภท',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    require: true,
    option: [
      { value: 'ltd', label: 'บริษัทจำกัด' },
      { value: 'ltd', label: 'บริษัทจำกัด' },
      { value: 'ltd', label: 'บริษัทจำกัด' },
    ],
  },
    
    {
      name: 'openingDate',
      label: 'วันที่เปิดใช้งาน',
      placeholder: 'วันที่เปิดใช้งาน',
      require: true,
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
  },
     {
      name: 'nameTh',
      label: 'ชื่อบริษัทภาษาไทย',
      placeholder: 'ชื่อบริษัทภาษาไทย',
      require: true,
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
  },
     {
      name: 'nameEn',
      label: 'ชื่อบริษัทภาษาอังกฤษ',
      placeholder: 'ชื่อบริษัทภาษาอังกฤษ',
      require: true,
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'descriptionsTh',
      label: 'คำอธิบาย(ภาษาไทย)',
      placeholder: 'คำอธิบาย(ภาษาไทย)',
      require:false,
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextAreaFormField',
  },
     {
      name: 'descriptionsEn',
      label: 'คำอธิบาย(ภาษาอังกฤษ)',
      placeholder: 'คำอธิบาย(ภาษาอังกฤษ)',
      require: false,
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextAreaFormField',
    },
    {
      name: 'websiteUrl',
      label: 'ลิงค์เว็บไซต์',
      placeholder: 'ลิงค์เว็บไซต์',
      require: true,
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'contactFacebook',
      label: 'Facebook',
      placeholder: 'กรอก Facebook',
      col: { xs: 24, sm: 12, md: 12, lg: 6, xl: 12 },
      type: 'TextboxFormField',
  },
     {
      name: 'contactWhatsapp',
      label: 'Whatsapp',
      placeholder: 'กรอก Whatsapp',
      col: { xs: 24, sm: 12, md: 12, lg: 6, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'websiteUrl',
      label: 'ลิ้งค์เว็ปไซต์',
      placeholder: 'กรอกลิ้งค์เว็ปไซต์',
      col: { xs: 24, sm: 12, md: 12, lg: 6, xl: 12 },
      type: 'TextboxFormField',
  },
     {
      name: 'contactWebsite',
      label: 'เว็ปไซต์ติดต่อ',
      placeholder: 'กรอกเว็ปไซต์ติดต่อ',
      col: { xs: 24, sm: 12, md: 12, lg: 6, xl: 12 },
      type: 'TextboxFormField',
  },
       {
      name: 'contactNote',
      label: 'โน๊ตติดต่อเพิ่มเติม',
      placeholder: 'กรอกโน๊ตติดต่อ',
      col: { xs: 24, sm: 12, md: 12, lg: 6, xl: 12 },
      type: 'TextboxFormField',
  },
       {
      name: 'logoUrl',
      label: 'ลิงค์โลโก้บริษัท',
      placeholder: 'กรอกลิงค์โลโก้บริษัท',
      col: { xs: 24, sm: 12, md: 12, lg: 6, xl: 12 },
      type: 'TextboxFormField',
    },
    
    {
      // icon: <TagFilled />,
      label: 'ข้อมูลที่อยู่',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 24 },
      type: 'LabelForm',
    },
    {
      name: ['active','address'],
      label: 'ทำงานอยู่',
      placeholder: 'ทำงานอยู่',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'SwitchFormField',
    },
    {
      name: 'descriptions',
      label: 'คำอธิบาย',
      placeholder: 'กรอกคำอธิบาย',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
  },
    
{
    name: 'addressType',
    label: 'ประเภทที่อยู่',
    placeholder: 'ประเภทที่อยู่',
    col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
    type: 'SelectFormField',
    option: [
      { value: 'Office', label: 'Office' },
      { value: 'Duo', label: 'Apartment' },
      { value: 'Team', label: 'Detached House' },
    ],
  },
 {
      name: 'province',
      label: 'จังหวัด',
      placeholder: 'กรอกจังหวัด',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'district',
      label: 'เขต',
      placeholder: 'กรอกเขต',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'subdistrict',
      label: 'ตำบล',
      placeholder: 'กรอกตำบล',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'address',
      label: 'ที่อยู่',
      placeholder: 'กรอกที่อยู่',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'postalCode',
      label: 'รหัสไปรษณีย์',
      placeholder: 'รหัสไปรษณีย์',
      col: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
];
