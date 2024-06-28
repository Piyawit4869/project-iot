// import React, { useEffect, useState } from "react";
import React from "react";
import * as API from "@src/apis";
import { TagOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Typography, Input, Button, Tag, Pagination } from "antd";
import { SearchProps } from "antd/es/input";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Image } from "antd";
import { TableComponent } from "@src/components/shared/TableComponent";
import dayjs from "dayjs";
import { CreateButton } from "@src/components/shared/CreateButton";

const { Title } = Typography;

// get API loader
export async function organizeLoader() {
  try {
    const organize = await API.organize.getAll();
    return { organize: organize.data };
  } catch (error) {
    return { error: "error", message: error };
  }
}

export const OrganizeIndex: React.FC = () => {
  const { organize } = useLoaderData() as any;

  const me = JSON.parse(localStorage.getItem("me") as any);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (me.role === "user" || me.role === "admin") {
      navigate("/");
    }
  }, []);

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
      render: (logoUrl: any) => {
        return <Image width={200} src={logoUrl} />;
      },
    },
    {
      title: "ชื่อองค์กร",
      dataIndex: "businessName",
      key: "businessName",
      filters: [
        {
          text: "Ney",
          value: "Ney",
        },
        {
          text: "Joe",
          value: "Joe",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record: { name: string | string[] }) =>
        record.name.includes(value as string),
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
      render: (date: any) => {
        return <>{dayjs(date).format("DD/MM/YYYY")}</>;
      },
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
      render: (active: any) =>
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

      render: (id: number) => {
        console.log(id);
        return (
          <Link to={`${id}`}>
            <Button
              style={{ fontSize: "16px", width: "180px" }}
              type="primary"
              icon={<EyeOutlined />}
            >
              ดูข้อมูล
            </Button>
          </Link>
        );
      },
    },
  ];

  // const { organize } = useLoaderData() as any;
  const [searchValue, setSearchValue] = React.useState<string>("");

  const onSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
  };

  return (
    <div>
      {/* <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
          <span>ตั้งค่าองค์กร</span>
        </Breadcrumb.Item>
      </Breadcrumb> */}

      <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ตั้งค่าองค์กร
      </Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />

        <span style={{ marginBottom: -60 }}>ค้นหาองค์กร</span>
      </div>

      <div>
        <Link to={"create"}>
          <CreateButton label={"เพิ่มข้อมูลลูกค้า"} />
        </Link>
      </div>

      {/* Search bar with button */}
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

      {/* Table */}
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
          // dataSource={dataSource}
          // columns={columns}
          // dataSource={products}
          dataSource={organize?.items ? organize?.items : []}
          pagination={false}
          bordered
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
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};
