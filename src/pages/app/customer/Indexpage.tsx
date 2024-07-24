import React, { useEffect, useState } from 'react';
import { Pagination, Button, Tag, Typography, Image, Spin } from 'antd';
import {
  EyeOutlined,
  TagOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { customerData as initialCustomerData } from './customerData';
import { SearchBar } from '@src/components/shared/SearchBar';

const { Title } = Typography;

const columns = [
  {
    title: 'ลำดับ',
    dataIndex: 'nummer',
    key: 'nummer',
    sorter: (a: { nummer: number }, b: { nummer: number }) =>
      a.nummer - b.nummer,
  },
  {
    title: 'รูปภาพ',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (imageUrl: string) => (
      <Image width={60} src={imageUrl} alt="รูปภาพ" />
    ),
  },
  {
    title: 'ชื่อลูกค้า',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'สาขาหลัก',
    dataIndex: 'isMainBranch',
    key: 'isMainBranch',
    render: (isMainBranch: string) => {
      if (isMainBranch == 'Yes') {
        return <CheckOutlined style={{ color: 'green', fontSize: '15px' }} />;
      }
      return <CloseOutlined style={{ color: 'red', fontSize: '15px' }} />;
    },
  },
  {
    title: 'เบอร์โทร',
    dataIndex: 'tel',
    key: 'tel',
  },

  {
    title: 'อีเมล',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'เว็ปไซต์',
    dataIndex: 'website',
    key: 'website',
    render: (website: string) => (
      <a href={website} target="_blank">
        {website}
      </a>
    ),
    width: '15%',
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
      <Link to={`/customer/${id}`}>
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

export const CustomerIndex: React.FC = () => {
  // const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(initialCustomerData);
      setLoading(false);
    }, 1000);
  }, []);

  // const onSearch = (value: string) => {
  //   console.log("Search:", value);
  // };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
          ข้อมูลลูกค้า
        </Title>
        <Link to={'create'}>
          <CreateButton label={'เพิ่มข้อมูลสาขา'} />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagOutlined />
        <span>ค้นหาลูกค้า</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px',
        }}
      >
        <SearchBar />
      </div>

      <div
        style={{
          boxShadow: '0 4px 8px rgba(0.25, 0.25, 0.25, 0.25)',
          borderRadius: '25px',
          overflow: 'hidden',
          marginTop: 16,
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <TableComponent
            columns={columns}
            dataSource={customers.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize,
            )} // Slice data for pagination
            pagination={false}
            bordered
          />
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Pagination
          current={currentPage}
          total={customers.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomerIndex;
