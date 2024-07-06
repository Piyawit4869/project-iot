import { useEffect, useState } from "react";
import {
  TagOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Typography, Input, Button, Tag, Pagination, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { TableComponent } from "@src/components/shared/TableComponent";
import { CreateButton } from "@src/components/shared/CreateButton";
import organizeData from './organizeData'; 
// import * as API from "@src/apis";

const { Title } = Typography;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
  },
  {
    title: "โลโก้",
    dataIndex: "logoUrl",
    key: "logoUrl",
    render: (logoUrl: string) => <Image width={100} src={logoUrl} alt="โลโก้" />,
  },
  {
    title: "ชื่อองค์กร",
    dataIndex: "businessName",
    key: "businessName",
  },
  {
    title: "คำอธิบายธุรกิจ",
    dataIndex: "businessDescription",
    key: "businessDescription",
  },
  {
    title: "จดทะเบียน",
    dataIndex: "businessRegister",
    key: "businessRegister",
    render: (date: string) => <>{dayjs(date).format("DD/MM/YYYY")}</>,
  },
  {
    title: "เบอร์โทรศัพท์",
    dataIndex: "businessPhone",
    key: "businessPhone",
  },
  {
    title: "Default User",
    dataIndex: "default_user",
    key: "default_user",
  },
  {
    title: "ระยะเวลาการใช้งานระบบ",
    dataIndex: "timeused",
    key: "timeused",
  },
  {
    title: "สถานะ",
    dataIndex: "active",
    key: "active",
    render: (active: boolean) =>
      active ? <Tag color="success">พร้อมใช้งาน</Tag> : <Tag color="error">ไม่พร้อมใช้งาน</Tag>,
  },
  {
    title: "รายละเอียด",
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

export const OrganizeIndex: React.FC = () => {
  const [organize, setOrganize] = useState(organizeData);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchOrganize = async () => {
  //     try {
  //       const response = await API.organize.getAll();
  //       setOrganize(response.data.items);
  //     } catch (error) {
  //       console.error("Failed to fetch organize data", error);
  //     }
  //   };

  //   fetchOrganize();
  // }, []);

  useEffect(() => {
    const me = JSON.parse(localStorage.getItem("me") as any);
    if (me.role === "user" || me.role === "admin") {
      navigate("/");
    }
  }, [navigate]);

  const onSearch = (value: string) => {
    const filteredData = organizeData.filter(item =>
      item.businessName.toLowerCase().includes(value.toLowerCase()) ||
      item.businessDescription.toLowerCase().includes(value.toLowerCase())
    );
    setOrganize(filteredData);
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ตั้งค่าองค์กร
      </Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />
        <span style={{ marginBottom: -60 }}>ค้นหาองค์กร</span>
      </div>
      <div>
        <Link to={"create"}>
          <CreateButton label={"เพิ่มข้อมูลลูกค้า"}/>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
        <Input
          addonBefore="ค้นหา"
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={() => onSearch(searchValue)}
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
          >ค้นหา </Button>
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
          dataSource={organizeData}
          pagination={false}
          bordered
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <Pagination defaultCurrent={1} total={organize.length} />
      </div>
    </div>
  );
};

export default OrganizeIndex;
