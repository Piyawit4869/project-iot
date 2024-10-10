import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Tag, Image, TableProps, Typography } from 'antd';
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

export const organizeColumns: TableProps['columns'] = [
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

export const branchColumns: TableProps['columns'] = [
  {
    title: 'ลำดับ',
    dataIndex: 'id',
    width: '50px',
    align: 'center',
    key: 'id',
    sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
  },
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
      return <CloseOutlined style={{ color: 'red', fontSize: '15px' }} />;
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
];
