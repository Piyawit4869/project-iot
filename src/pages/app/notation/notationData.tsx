import { EyeOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export const columns: ColumnsType<any> = [
  {
    title: 'เลขที่เอกสาร',
    dataIndex: 'docNo',
    key: 'docNo',
  },
  {
    title: 'ประเภทเอกสาร',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: 150,
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 150,
    render: (value: any) => {
      return handleStatusTag(value);
    },
  },
  {
    title: 'สถานะเอกสาร',
    dataIndex: 'docStatus',
    key: 'docStatus',
    align: 'center',
    width: 150,
    render: (value: any) => {
      return handleStatusTag(value);
    },
  },
  {
    title: 'วันที่สร้าง',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 150,
    render: (value) => {
      return <>{dayjs(value).format('DD/MM/YYYY')}</>;
    },
  },
  {
    title: 'วันหมดอายุการใช้งาน',
    dataIndex: 'expiredAt',
    key: 'expiredAt',
    align: 'center',
    width: 150,
    render: (value) => {
      return <>{dayjs(value).format('DD/MM/YYYY')}</>;
    },
  },

  {
    title: 'รายละเอียด',
    key: 'details',
    dataIndex: 'id',
    align: 'center',
    render: (id: number) => (
      <Link to={`${id}`}>
        <Button type="primary" icon={<EyeOutlined />}>
          ดูข้อมูล
        </Button>
      </Link>
    ),
  },
];
export const handleStatusTag = (status: string) => {
  switch (status) {
    case 'draft':
      return <Tag color="geekblue">{status}</Tag>;
    case 'waiting_for_review':
      return <Tag color="purple">{status}</Tag>;
    case 'done':
      return <Tag color="green">{status}</Tag>;
    case 'editing':
      return <Tag color="blue">{status}</Tag>;
    case 'pending':
      return <Tag color="magenta">{status}</Tag>;
    case 'active':
      return <Tag color="#108ee9">{status}</Tag>;
    case 'approved':
      return <Tag color="#87d068">{status}</Tag>;
    case 'rejected':
      return <Tag color="#f50">{status}</Tag>;
    case 'canceled':
      return <Tag color="default">{status}</Tag>;
    default:
      return <>{status}</>;
  }
};

export const handleTypeTag = (type: string) => {
  switch (type) {
    case 'invoice':
      return <Tag color="geekblue">{type}</Tag>;
    case 'quotation':
      return <Tag color="orange">{type}</Tag>;
    case 'delivery_order':
      return <Tag color="purple">{type}</Tag>;
    case 'purchase_order':
      return <Tag color="green">{type}</Tag>;
    case 'receipt':
      return <Tag color="magenta">{type}</Tag>;

    default:
      return <>{type}</>;
  }
};
