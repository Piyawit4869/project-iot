import React, { useEffect, useState } from 'react';
import { Button, Input, Pagination, Typography, } from 'antd';
import { SearchOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';



const { Title } = Typography;


const columns = [
  {
    title: 'ลำดับ',
    dataIndex: 'index',
    key: 'index',
    sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
  },
  {
    title: 'ชื่อผู้ใช้',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'อีเมล',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'รายละเอียดเพิ่มเติม',
    dataIndex: 'details',
    key: 'details',
    render: (_: any, record: any) => (
      <Link to={`/users/single/${record.id}`}>
        <Button style={{ fontSize: '16px', width: '180px' }} type="primary" icon={<EyeOutlined />}>
          ดูข้อมูล
        </Button>
      </Link>
    ),
  },
];

export const UsersIndex: React.FC = () => {
  const { users } = useLoaderData() as any;
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role === 'user' || me.role === 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const onSearch = (value: string) => {
    console.log('Search:', value);
    // Implement search functionality here
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ข้อมูลผู้ใช้
      </Title>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />
        <span style={{ marginBottom: -60 }}>ค้นหาผู้ใช้</span>
      </div>
        <div>
        <Link to={"create"}>
        <CreateButton label={" เพิ่มข้อมูลผู้ใช้"}/>
        </Link>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px',
        }}
      >
        <Input
          addonBefore="ค้นหา"
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 304 }}
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={() => onSearch(searchValue)}
          style={{
            backgroundColor: "#19142A",
              borderColor: "#19142A",
          }}
        >
        
          ค้นหา
        </Button>
      </div>

      <div
        style={{
          boxShadow: '0 4px 8px rgba(0.25, 0.25, 0.25, 0.25)',
          borderRadius: '25px',
          overflow: 'hidden',
          marginTop: 16,
        }}
      >
        <TableComponent
          columns={columns}
          dataSource={users?.items ? users?.items : []}
          pagination={false}
          bordered
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};
