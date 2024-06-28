import React from "react";
import { Input, Pagination, Button, Tag, Typography, Image } from "antd";
import { SearchOutlined, TagOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TableComponent } from "@src/components/shared/TableComponent";

import { CreateButton } from "@src/components/shared/CreateButton";

const { Title } = Typography;

export const BranchIndex: React.FC = () => {

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "nummer",
      key: "nummer",
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "โลโก้",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: any) => {
        return <Image width={200} src={imageUrl} />;
      },
    },
    {
      title: "ชื่อโปรเจค",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
      render: (active: any) => (active ? <Tag color="success">พร้อมใช้งาน</Tag> : <Tag color="error">ไม่พร้อมใช้งาน</Tag>),
    },
    {
      title: "สาขาหลัก",
      dataIndex: "isMainBranch",
      key: "isMainBranch",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "เว็ปไซต์",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "รายละเอียดเพิ่มเติม",
      key: "details",
      dataIndex: "id",
      render: (id: number) => (
        <Link to={`/branch/singlebranch/${id}`}>
          <Button style={{ fontSize: "16px", width: "180px" }} type="primary" icon={<EyeOutlined />}>
            ดูข้อมูล
          </Button>
        </Link>
      ),
    },
  ];

  const [searchValue, setSearchValue] = React.useState<string>("");

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ข้อมูลสาขา
      </Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />
        <span style={{ marginBottom: -60 }}>ค้นหาสาขา</span>
      </div>

      <div>
        <Link to={"create"}>
        <CreateButton label={"เพิ่มข้อมูลสาขา"}/>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
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
          boxShadow: "0 4px 8px rgba(0.25, 0.25, 0.25, 0.25)",
          borderRadius: "25px",
          overflow: "hidden",
          marginTop: 16,
        }}
      >
        <TableComponent columns={columns} pagination={false} bordered dataSource={undefined} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default BranchIndex;
