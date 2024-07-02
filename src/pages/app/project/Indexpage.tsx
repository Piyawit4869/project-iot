import  { useEffect, useState } from "react";
import {
  TagOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Button, Tag, Pagination, Typography, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { TableComponent } from "@src/components/shared/TableComponent";
import { CreateButton } from "@src/components/shared/CreateButton";
import { projectData } from './projectData'; // Import the project data

const { Title } = Typography;

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "nummer",
    key: "nummer",
    sorter: (a: { nummer: number }, b: { nummer: number }) => a.nummer - b.nummer,
  },
  {
    title: "รูปภาพ",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (imageUrl: string) => <Image width={100} src={imageUrl} alt="รูปภาพ" />,
  },
  {
    title: "ชื่อโครงการ",
    dataIndex: "name",
    key: "name",
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
    title: "สถานะ",
    dataIndex: "active",
    key: "active",
    render: (active: boolean) => (active ? <Tag color="success">พร้อมใช้งาน</Tag> : <Tag color="error">ไม่พร้อมใช้งาน</Tag>),
  },
  {
    title: "รายละเอียดเพิ่มเติม",
    key: "details",
    dataIndex: "id",
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
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("me") as any);
    if (me.role === "user" || me.role === "admin") {
      navigate("/");
    }
  }, [navigate]);

  const onSearch = (value: string) => {
    console.log("Search:", value);
    // Implement search functionality here
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ข้อมูลโครงการ
      </Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />
        <span style={{ marginBottom: -60 }}>ค้นหาโครงการ</span>
      </div>
      <div>
        <Link to={"create"}>
          <CreateButton label={"เพิ่มข้อมูลโครงการ"}/>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
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
        <TableComponent
          columns={columns}
          dataSource={projectData}  // Use the imported project data
          pagination={false}
          bordered
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <Pagination defaultCurrent={1} total={projectData.length} />
      </div>
    </div>
  );
};

export default ProjectIndex;
