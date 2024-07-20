import React, { useEffect, useState } from "react";
import { Input, Pagination, Button, Tag, Typography, Image, Spin } from "antd";
import { SearchOutlined, TagOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TableComponent } from "@src/components/shared/TableComponent";
import { CreateButton } from "@src/components/shared/CreateButton";
import { branchData as initialBranchData } from "./branchData";

const { Title } = Typography;

export const BranchIndex: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setData(initialBranchData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch branch data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "nummer",
      key: "nummer",
      sorter: (a: { nummer: number }, b: { nummer: number }) =>
        a.nummer - b.nummer,
    },
    {
      title: "โลโก้",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => {
        return <Image width={200} src={imageUrl} />;
      },
    },
    {
      title: "ชื่อโปรเจค",
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
      title: "active",
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
      title: "รายละเอียดเพิ่มเติม",
      key: "details",
      dataIndex: "id",
      render: (id: number) => (
        <Link to={`/branch/${id}`}>
          <Button
            style={{ fontSize: "16px", width: "180px" }}
            type="primary"
            icon={<EyeOutlined />}
          >
            ดูข้อมูล
          </Button>
        </Link>
      ),
    },
  ];

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
          ข้อมูลสาขา
        </Title>
        <Link to={"create"}>
          <CreateButton label={"เพิ่มข้อมูลสาขา"} />
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined />
        <span >ค้นหาสาขา</span>
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
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <TableComponent
            columns={columns}
            pagination={false}
            bordered
            dataSource={data}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination defaultCurrent={1} total={data.length} />
      </div>
    </div>
  );
};

export default BranchIndex;
