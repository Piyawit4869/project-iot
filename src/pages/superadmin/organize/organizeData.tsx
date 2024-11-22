import { CheckOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Tag, Image, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export const organizeData = [
  {
    id: 1,
    logoUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    businessName: 'ABC Ltd.',
    businessDescription: 'Leading provider of business solutions.',
    businessRegister: '2023-01-01',
    businessPhone: '123-456-7890',
    default_user: 'John Doe',
    timeused: '2 years',
    active: true,
  },
  {
    id: 2,
    logoUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    businessName: 'XYZ Ltd.',
    businessDescription: 'Innovative tech company.',
    businessRegister: '2022-05-15',
    businessPhone: '098-765-4321',
    default_user: 'Jane Smith',
    timeused: '1 year',
    active: false,
  },
];

export const organizeColumns: ColumnsType<any> = [
  // {
  //   title: 'ลำดับ',
  //   dataIndex: 'id',
  //   width: '50px',
  //   align: 'center',
  //   key: 'id',
  //   sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
  // },
  {
    title: 'โลโก้',
    dataIndex: 'logoUrl',
    width: '65px',
    align: 'center',
    key: 'logoUrl',
    render: (logoUrl: string) => <Image width={60} src={logoUrl} />,
  },
  {
    title: 'ชื่อองค์กร',
    width: '400px',
    align: 'start',
    key: 'nameTh',
    render: (data: any) => {
      return <Typography>{data.nameTh + ` (${data.nameEn})`}</Typography>;
    },
  },
  // {
  //   title: 'คำอธิบายธุรกิจ',
  //   dataIndex: 'descriptionsTh',
  //   width: '300px',
  //   align: 'start',
  //   key: 'descriptionsTh',
  //   render: (description: string) => (
  //     <Typography.Paragraph
  //       style={{ margin: 0 }}
  //       ellipsis={{ rows: 2, expandable: false }}
  //     >
  //       {description}
  //     </Typography.Paragraph>
  //   ),
  // },
  // {
  //   title: 'วันที่จดทะเบียน',
  //   dataIndex: 'businessRegister',
  //   width: '120px',
  //   align: 'center',
  //   key: 'businessRegister',
  //   render: (date: string) => <>{dayjs(date).format('DD/MM/YYYY')}</>,
  // },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'contactPhone',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'อีเมล์ติดต่อ',
    dataIndex: 'contactEmail',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'Facebook',
    dataIndex: 'contactFacebook',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'ไลน์ไอดี',
    dataIndex: 'contactLine',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'WhatsApp',
    dataIndex: 'contactWhatsapp',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'เว็บไซต์',
    dataIndex: 'contactWebsite',
    width: '150px',
    align: 'start',
    key: 'websiteUrl',
    render: (websiteUrl: string) => (
      <Link to={websiteUrl}>
        <Typography.Paragraph
          ellipsis={{ rows: 2, expandable: false }}
          style={{ color: '#4286f4' }}
        >
          {websiteUrl}
        </Typography.Paragraph>
      </Link>
    ),
  },
  {
    title: 'สถานะ',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (active: boolean) =>
      active ? (
        <Tag color="success">พร้อมใช้งาน</Tag>
      ) : (
        <Tag color="error">ไม่พร้อมใช้งาน</Tag>
      ),
  },
  {
    title: 'รายละเอียด',
    key: 'details',
    dataIndex: 'id',
    align: 'center',
    render: (slug: string) => (
      <Link to={`${slug}`}>
        <Button type="primary" icon={<EyeOutlined />}>
          ดูข้อมูล
        </Button>
      </Link>
    ),
  },
];

export const branchColumns: ColumnsType<any> = [
  {
    title: 'โลโก้',
    dataIndex: 'logoUrl',
    width: '65px',
    align: 'center',
    key: 'logoUrl',
    render: (logoUrl: string) => <Image width={60} src={logoUrl} />,
  },
  {
    title: 'ชื่อสาขา',
    width: '200px',
    align: 'start',
    key: 'nameTh',
    render: (data: any) => {
      return <Typography>{data.nameTh + ` (${data.nameEn})`}</Typography>;
    },
  },
  {
    title: 'สาขาหลัก',
    dataIndex: 'isMain',
    key: 'isMain',
    align: 'center',
    render: (isMainBranch: boolean) => {
      if (isMainBranch === true) {
        return <CheckOutlined style={{ color: 'green', fontSize: '15px' }} />;
      }
      return <>-</>;
    },
  },

  {
    title: 'วันที่จดทะเบียน',
    dataIndex: 'businessRegister',
    width: '120px',
    align: 'center',
    key: 'businessRegister',
    render: (date: string) => <>{dayjs(date).format('DD/MM/YYYY')}</>,
  },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'contactPhone',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'อีเมล์ติดต่อ',
    dataIndex: 'contactEmail',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },

  {
    title: 'เว็บไซต์',
    dataIndex: 'websiteUrl',
    width: '150px',
    align: 'start',
    key: 'websiteUrl',
    render: (websiteUrl: string) => (
      <Link to={websiteUrl}>
        <Typography.Paragraph
          ellipsis={{ rows: 2, expandable: false }}
          style={{ color: '#4286f4' }}
        >
          {websiteUrl}
        </Typography.Paragraph>
      </Link>
    ),
  },
  {
    title: 'สถานะ',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (active: boolean) =>
      active ? (
        <Tag color="success">พร้อมใช้งาน</Tag>
      ) : (
        <Tag color="error">ไม่พร้อมใช้งาน</Tag>
      ),
  },
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (id: any) => {
      return (
        <Link to={`branch/${id}`}>
          <Button type="primary">ดูเพิ่มเติม</Button>
        </Link>
      );
    },
  },
];

export const AddressesColumns = (handleViewDetails: (id: any) => void) => [
  {
    title: 'ชื่อที่อยู่',
    width: '200px',
    align: 'start',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'บ้านเลขที่',
    width: '80px',
    align: 'center',
    key: 'houseNo',
    dataIndex: 'houseNo',
  },
  {
    title: 'จังหวัด',
    width: '200px',
    align: 'center',
    key: 'province',
    dataIndex: 'province',
  },
  {
    title: 'อำเภอ/เขต',
    width: '200px',
    align: 'center',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (id: any) => (
      <Button
        type="primary"
        onClick={() => handleViewDetails(id)} // Trigger the handler
      >
        ดูเพิ่มเติม
      </Button>
    ),
  },
];

export const mockupAddresses = [
  {
    id: 1,
    name: 'สำนักงานใหญ่',
    province: 'กรุงเทพมหานคร',
    city: 'จรัญสนิทวงศ์',
    houseNo: '99/6',
  },
  {
    id: 2,
    name: 'สาขา2',
    province: 'กรุงเทพมหานคร',
    city: 'บางกอกน้อย',
    houseNo: '123/9',
  },
  {
    id: 3,
    name: 'สาขา3',
    province: 'กรุงเทพมหานคร',
    city: 'บางนา',
    houseNo: '867',
  },
];

export const SettingsColumns = (handleViewDetails: (id: any) => void) => [
  {
    title: 'ชื่อการตั้งค่า',
    align: 'start',
    key: 'id',
    dataIndex: 'id',
    render: (id: any) => <>การตั้งค่าที่ {id}</>,
  },
  {
    title: 'ภาษา',
    align: 'start',
    key: 'defaultLanguage',
    dataIndex: 'defaultLanguage',
  },
  {
    title: 'ธีมสี',
    align: 'center',
    key: 'theme',
    dataIndex: 'theme',
  },
  {
    title: 'ขนาดตัวอักษร',
    align: 'center',
    key: 'textDisplay',
    dataIndex: 'textDisplay',
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (id: any) => (
      <Button
        type="primary"
        onClick={() => handleViewDetails(id)} // Trigger the handler
      >
        ดูเพิ่มเติม
      </Button>
    ),
  },
];

export const mockupSettings = [
  {
    id: 1,
    defaultLanguage: 'th',
    theme: 'light',
    textDisplay: 'normal',
  },
  {
    id: 2,
    defaultLanguage: 'en',
    theme: 'light',
    textDisplay: 'small',
  },
  {
    id: 3,
    defaultLanguage: 'th',
    theme: 'dark',
    textDisplay: 'large',
  },
];
