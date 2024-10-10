import { EyeOutlined } from '@ant-design/icons';
import { Button, Image, Tag } from 'antd';
import { Link } from 'react-router-dom';

export const userData = [
  {
    key: '1',
    index: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0123456789',
    active: true,
    id: '1',
  },
  {
    key: '2',
    index: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543210',
    active: false,
    id: '2',
  },
  {
    key: '3',
    index: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '1234567890',
    active: true,
    id: '3',
  },
];
export const userColumns: any = [
  {
    title: 'รูปภาพ',
    dataIndex: 'photoUrl',
    key: 'photoUrl',
    render: (_: any, record: any) => {
      return (
        <Image
          src={record?.profile?.photoUrl}
          style={{ width: 60, height: 60 }}
          preview={false}
        />
      );
    },
  },
  {
    title: 'ชื่อผู้ใช้',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'อีเมล',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'ตำแหน่ง',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    render: (_: any, record: any) => {
      return <>{record?.role?.name}</>;
    },
  },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center',
    render: (value: any, record: any) => {
      return value ? record.profile.phone : record.profile.phone;
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (active: any) =>
      active ? (
        <Tag color="success">พร้อมใช้งาน</Tag>
      ) : (
        <Tag color="error">ไม่พร้อมใช้งาน</Tag>
      ),
  },

  {
    title: 'รายละเอียด',
    dataIndex: 'details',
    key: 'details',
    align: 'center',
    render: (_: any, record: any) => (
      <Link to={`/user/${record.id}`}>
        <Button
          style={{ fontSize: '16px', width: '180px' }}
          type="primary"
          icon={<EyeOutlined />}
        >
          ดูข้อมูล
        </Button>
      </Link>
    ),
  },
];
