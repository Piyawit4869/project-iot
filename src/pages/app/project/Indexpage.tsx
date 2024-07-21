import { useEffect, useState } from 'react';
import {
  TagOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Tag, Pagination, Typography, Image, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { projectData as initialProjectData } from './projectData';
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
    title: 'ชื่อโครงการ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'สาขาหลัก',
    dataIndex: 'isMainBranch',
    key: 'isMainBranch',
    render: (isMainBranch: string) => {
      if (isMainBranch) {
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
    render: (websiteUrl: string) => (
      <a href={websiteUrl} target="_blank">
        {websiteUrl}
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
      <Link to={`${id}`}>
        <Button type="primary" icon={<EyeOutlined />}>
          ดูข้อมูล
        </Button>
      </Link>
    ),
  },
];

export const ProjectIndex = () => {
  const navigate = useNavigate();
  // const [searchValue, setSearchValue] = useState<string>("");
  const [projectData, setProjectData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role === 'user' || me.role === 'admin') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjectData(initialProjectData);
      setLoading(false);
    }, 1000);
  }, []);

  // const onSearch = (value: string) => {
  //   console.log("Search:", value);
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
          ข้อมูลโครงการ
        </Title>
        <Link to={'create'}>
          <CreateButton label={'เพิ่มข้อมูลโครงการ'} />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagOutlined />
        <span>ค้นหาโครงการ</span>
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
            dataSource={projectData}
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
        <Pagination defaultCurrent={1} total={projectData.length} />
      </div>
    </div>
  );
};

export default ProjectIndex;
