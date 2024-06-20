

import { Button, Pagination, Input, Table, Breadcrumb } from "antd";
import { useLoaderData, useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import { HomeOutlined } from "@ant-design/icons"; // นำเข้าไอคอน Home

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "ชื่อผู้ใช้",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "อีเมล",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "เบอร์โทรศัพท์",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "รายละเอียดเพิ่มเติม",
    dataIndex: "details",
    key: "details",
    render: () => <Button type="link" onClick={() => ('/users/single')}>ดูข้อมูล</Button>,
  },
];


export const UsersIndex = () => {
  const navigate = useNavigate(); 
 const {user}=useLoaderData() as any
 console.log({user})

  return (
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item>ข้อมูลผู้ใช้</Breadcrumb.Item>
      </Breadcrumb>
      <h1>ข้อมูลผู้ใช้</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Input.Search
          placeholder="ค้นหา"
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => navigate('/users/create')}>เพิ่มข้อมูลผู้ใช้</Button>
      </div>
      <Table columns={columns} dataSource={[]} pagination={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </>
  );
};
