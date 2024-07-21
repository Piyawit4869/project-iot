import React, { useEffect, useState } from 'react';
import { Pagination, Button, Tag, Typography, Image, Spin } from 'antd';
import {
  TagOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Link, useNavigation } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { branchData as initialBranchData } from './branchData';
import { SearchBar } from '@src/components/shared/SearchBar';

const { Title } = Typography;

export const BranchIndex: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
    const { state } = useNavigation();
  // const [searchValue, setSearchValue] = useState<string>("");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setData(initialBranchData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch branch data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'nummer',
      key: 'nummer',
      sorter: (a: { nummer: number }, b: { nummer: number }) =>
        a.nummer - b.nummer,
    },
    {
      title: 'โลโก้',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => {
        return <Image width={60} src={imageUrl} />;
      },
    },
    {
      title: 'ชื่อโปรเจค',
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
    },
    {
      title: 'active',
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
        <Link to={`/branch/${id}`}>
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

  // const onSearch = (value: string) => {
  //   console.log(value);
  // };

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
          ข้อมูลสาขา
        </Title>
        <Link to={'create'}>
          <CreateButton label={'เพิ่มข้อมูลสาขา'} />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagOutlined />
        <span>ค้นหาสาขา</span>
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
              loading={loading || state === 'loading' || state === 'submitting'}
            columns={columns}
            pagination={false}
            bordered
            dataSource={data}
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
        <Pagination defaultCurrent={1} total={data.length} />
      </div>
    </div>
  );
};

export default BranchIndex;
