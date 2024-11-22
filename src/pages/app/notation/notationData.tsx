import { Tag } from 'antd';

export const data = [
  {
    id: 1,
    number: 'QU2419110001',
    status: 'draft',
    type: 'quotation',
    createdAt: '2024-11-19T10:55:23.192Z',
    expiredAt: '2024-12-01T10:55:00.192Z',
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
