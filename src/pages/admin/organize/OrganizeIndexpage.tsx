import React from "react";
import * as API from "@src/apis";
import {
  HomeOutlined,
  TagOutlined,
  EyeOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Typography, Input, Button, Table } from "antd";
import { SearchProps } from "antd/es/input";
import { Link, useLoaderData } from "react-router-dom";

const { Title } = Typography;

// get API loader 
export async function organizeLoader() {
    try {
      const organize = await API.organize.getAll();
      return {organize:organize.data};
    } catch (error) {
      return {error:"error",message:error}
    }
}


export const OrganizeIndex: React.FC = () => {
  const {organize} = useLoaderData()as any;
  const [searchValue, setSearchValue] = React.useState<string>("");
  console.log({organize});
  const onSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "ชื่อองค์กร",
      dataIndex: "businessName",
      key: "businessName",
    },
    {
      title: "เปิดใช้งานตั้งแต่วันที่",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "ระยะเวลาที่ใช้งาน",
      dataIndex: "usageDuration",
      key: "usageDuration",
    },
    {
      title: "รายละเอียด",
      dataIndex: "details",
      key: "details",
      render: () => (
        <Button
          style={{ fontSize: "16px", width: "180px" }}
          type="primary"
          icon={<EyeOutlined />}
        >
          ดูข้อมูล
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      index: "1",
      organizationName: "noney.org",
      startDate: "12/04/2566 09:25",
      usageDuration: "100 วัน",
    },
    {
      key: "2",
      index: "2",
      organizationName: "ครู ไพบูลย์",
      startDate: "12/04/2566 09:25",
      usageDuration: "120 วัน",
    },
    {
      key: "3",
      index: "3",
      organizationName: "เปาบุ้นจิ้น",
      startDate: "12/04/2566 09:25",
      usageDuration: "99 วัน",
    },
  ];

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
          <span>ตั้งค่าองค์กร</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3} style={{ marginBottom: -10, marginTop: -2 }}>
        ตั้งค่าองค์กร
      </Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagOutlined style={{ marginBottom: -60, marginRight: 8 }} />

        <span style={{ marginBottom: -60 }}>ค้นหาองค์กร</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div></div>
        <Link to={"create"}>
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          style={{
            fontSize: "18px",
            marginRight: "30",
            backgroundColor: "#1c2c5c",
            borderColor: "#1c2c5c",
            borderRadius: "10px",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          เพิ่มข้อมูลลูกค้า
        </Button>
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
        <Table
          
          columns={columns}
          dataSource={organize?.items?organize?.items:[]}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};
