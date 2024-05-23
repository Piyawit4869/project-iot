

import { Button, Pagination, Input, Table, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
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
    render: () => <Button type="link">ดูข้อมูลผู้ใช้</Button>,
  },
];

const data = [
  {
    key: "1",
    index: "1",
    name: "ผู้ใช้หนึ่ง",
    email: "01@gmail.com",
    phone: "0999999998",
  },
  {
    key: "2",
    index: "2",
    name: "ผู้ใช้สอง",
    email: "02@gmail.com",
    phone: "0999999998",
  },
  {
    key: "3",
    index: "3",
    name: "ผู้ใช้สาม",
    email: "03@gmail.com",
    phone: "0999999998",
  },
  {
    key: "4",
    index: "4",
    name: "ผู้ใช้สี่",
    email: "04@gmail.com",
    phone: "0999999999",
  },
  {
    key: "5",
    index: "5",
    name: "ผู้ใช้ห้า",
    email: "05@gmail.com",
    phone: "0999999999",
  },
  {
    key: "6",
    index: "6",
    name: "ผู้ใช้หก",
    email: "06@gmail.com",
    phone: "0999999999",
  },
  {
    key: "7",
    index: "7",
    name: "ผู้ใช้เจ็ด",
    email: "07@gmail.com",
    phone: "0999999999",
  },
  {
    key: "8",
    index: "8",
    name: "ผู้ใช้แปด",
    email: "08@gmail.com",
    phone: "0999999999",
  },
  {
    key: "9",
    index: "9",
    name: "ผู้ใช้เก้า",
    email: "09@gmail.com",
    phone: "0999999999",
  },
  {
    key: "10",
    index: "10",
    name: "ผู้ใช้สิบ",
    email: "10@gmail.com",
    phone: "0999999999",
  },
];

export const UsersIndex = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item>ตั้งค่าผู้ใช้</Breadcrumb.Item>
      </Breadcrumb>
      <h1>ตั้งค่าผู้ใช้</h1>
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
      <Table columns={columns} dataSource={data} pagination={false} />
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
    </div>
  );
};
