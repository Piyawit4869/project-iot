import React, { useEffect, useState } from "react";
import {
  TagOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Typography, Button, Tag, Pagination, Image } from "antd";
import { Link, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import dayjs from "dayjs";
import { TableComponent } from "@src/components/shared/TableComponent";
import { CreateButton } from "@src/components/shared/CreateButton";
import { SearchBar } from "@src/components/shared/SearchBar";
// import organizeData from "./organizeData";
// import * as API from "@src/apis";

const { Title } = Typography;

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "id",
    key: "id",
    sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
  },
  {
    title: "โลโก้",
    dataIndex: "logoUrl",
    key: "logoUrl",
    render: (logoUrl: string) => (
      <Image width={60} src={logoUrl} alt="โลโก้" />
    ),
  },
  {
    title: "ชื่อองค์กร",
    dataIndex: "businessNameEN",
    key: "businessNameEN",
    width: "10%",
  },
  {
    title: "คำอธิบายธุรกิจ",
    dataIndex: "businessDescriptionEN",
    key: "businessDescriptionEN",
    width: '30%',
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
    title: "เว็บไซต์",
    dataIndex: "websiteUrl",
    key: "websiteUrl",
    render: (websiteUrl: string) => <a href={websiteUrl} target="_blank">{websiteUrl}</a>,
    width: '15%',
  },
  {
    title: "สถานะ",
    dataIndex: "active",
    key: "active",
    render: (active: boolean) =>
      active ? (
        <Tag color="success">พร้อมใช้งาน</Tag>
      ) : (
        <Tag color="error">ไม่พร้อมใช้งาน</Tag>
      ),
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
  // const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { organize } = useLoaderData() as any
  const { state } = useNavigation()

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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // const onSearch = (value: string) => {
  //   const filteredData = organizeData.filter(
  //     (item) =>
  //       item.businessName.toLowerCase().includes(value.toLowerCase()) ||
  //       item.businessDescription.toLowerCase().includes(value.toLowerCase())
  //   );
  //   // setOrganize(filteredData);
  // };

  return (
    <div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ตั้งค่าองค์กร
        </Title>
        <Link to={"create"}>
          <CreateButton label={"เพิ่มข้อมูลองค์กร"} />
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined />
        <span >ค้นหาองค์กร</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <SearchBar />
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
          dataSource={organize}
          pagination={false}
          bordered
          loading={loading || state === "loading" || state === "submitting"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination defaultCurrent={1} total={organize.length} />
      </div>
    </div>
  );
};

export default OrganizeIndex;

export async function organizeLoader() {
  try {
    //   const organize = await API.organize.getAll();
    //   return { organize: organize.data };
    return {};
  } catch (error) {
    return { error: "error", message: error };
  }
}
