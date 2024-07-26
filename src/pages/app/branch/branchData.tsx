import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, TableProps, Tag, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const branchData = [
  {
    key: '1',
    nummer: 1,
    imageUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    name: 'Branch 1',
    active: true,
    isMainBranch: 'Yes',
    tel: '0123456789',
    email: 'branch1@example.com',
    website: 'https://branch1.com',
    id: '1',
  },
  {
    key: '2',
    nummer: 2,
    imageUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    name: 'Branch 2',
    active: false,
    isMainBranch: 'No',
    tel: '9876543210',
    email: 'branch2@example.com',
    website: 'https://branch2.com',
    id: '2',
  },
  {
    key: '3',
    nummer: 3,
    imageUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    name: 'Branch 3',
    active: true,
    isMainBranch: 'Yes',
    tel: '1234567890',
    email: 'branch3@example.com',
    website: 'https://branch3.com',
    id: '3',
  },
];

export const branchColumn: TableProps['columns'] = [
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
  // {
  //   title: 'ชื่อโปรเจค',
  //   dataIndex: 'name',
  //   key: 'name',
  //   align: 'start',
  // },
  {
    title: 'สาขาหลัก',
    dataIndex: 'isMain',
    key: 'isMain',
    align: 'center',
    render: (isMain: boolean) => {
      if (isMain) {
        return <CheckOutlined style={{ color: 'green', fontSize: '15px' }} />;
      }
      return <CloseOutlined style={{ color: 'red', fontSize: '15px' }} />;
    },
  },
  {
    title: 'เบอร์โทร',
    dataIndex: 'contactPhone',
    width: '100px',
    align: 'start',
    key: 'contactPhone',
  },
  {
    title: 'อีเมล',
    dataIndex: 'contactEmail',
    width: '100px',
    align: 'start',
    key: 'contactEmail',
  },
  {
    title: 'เว็ปไซต์',
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
    title: 'รายละเอียด',
    key: 'details',
    dataIndex: 'slug',
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
