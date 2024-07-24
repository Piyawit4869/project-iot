import { Pagination, Button, Image, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { data } from './notationData';
import { EyeOutlined, TagOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { SearchBar } from '@src/components/shared/SearchBar';

export const NotationIndex = () => {
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
      title: 'ชื่อเอกสาร',
      dataIndex: 'name',
      key: 'name',
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

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
          ข้อมูลเอกสาร
        </Title>
        <Link to="create">
          <CreateButton label="เพิ่มข้อมูลเอกสาร" />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagOutlined />
        <span>ค้นหาองค์กร</span>
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
        <TableComponent
          columns={columns}
          pagination={false}
          bordered={false}
          dataSource={data}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </>
  );
};

export default NotationIndex;
