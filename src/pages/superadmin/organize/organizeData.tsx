import { EyeOutlined } from '@ant-design/icons';
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
    render: (logoUrl: string) => <Image width={60} src={logoUrl} alt="โลโก้" />,
  },
  {
    title: 'ชื่อองค์กร',
    dataIndex: 'businessNameEN',
    width: '200px',
    align: 'start',
    key: 'businessNameEN',
  },
  {
    title: 'คำอธิบายธุรกิจ',
    dataIndex: 'businessDescriptionEN',
    width: '300px',
    align: 'start',
    key: 'businessDescriptionEN',
    render: (description: string) => (
      <Typography.Paragraph ellipsis={{ rows: 2, expandable: false }}>
        {description}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'จดทะเบียน',
    dataIndex: 'businessRegister',
    width: '65px',
    align: 'center',
    key: 'businessRegister',
    render: (date: string) => <>{dayjs(date).format('DD/MM/YYYY')}</>,
  },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'businessPhone',
    width: '65px',
    align: 'start',
    key: 'businessPhone',
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
    render: (id: number) => (
      <Link to={`${id}`}>
        <Button type="primary" icon={<EyeOutlined />}>
          ดูข้อมูล
        </Button>
      </Link>
    ),
  },
];

export const branchColumns = [
  {
    title: 'ลำดับ',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: 'ชื่อองค์กร',
    dataIndex: 'nameTh',
    key: 'businessName',
  },
  {
    title: 'ประเภทธุรกิจ',
    dataIndex: 'type',
    key: 'businessType',
  },
  {
    title: 'โมเดล',
    dataIndex: 'businessModel',
    key: 'businessModel',
  },
  {
    title: 'ประเภทสาขา',
    dataIndex: 'type',
    key: 'branchType',
  },
  {
    title: 'โทรศัพท์',
    dataIndex: 'phone',
    key: 'telephone',
  },
  {
    title: 'อีเมลล์',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'เว็บไซต์',
    dataIndex: 'websiteUrl',
    key: 'websiteUrl',
  },
  {
    title: 'รายละเอียด',
    key: 'details',
    dataIndex: 'id',
    render: (id: number) => {
      return (
        <Link to={`${id}`}>
          <Button
            style={{ fontSize: '16px', width: '180px' }}
            type="primary"
            icon={<EyeOutlined />}
          >
            ดูข้อมูล
          </Button>
        </Link>
      );
    },
  },
];
