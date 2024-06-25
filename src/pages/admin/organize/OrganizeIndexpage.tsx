// import React, { useEffect, useState } from "react";
import React from "react";
import * as API from "@src/apis";
import {
  HomeOutlined,
  TagOutlined,
  EyeOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Typography, Input, Button } from "antd";
import { SearchProps } from "antd/es/input";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Image } from "antd";
import { TableComponent } from "@src/components/shared/TableComponent";
// import { render } from "react-dom";
// // import axios from "axios";

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

export const OrganizeIndexpage: React.FC = () => {
  const { organize } = useLoaderData() as any;

  const me = JSON.parse(localStorage.getItem("me") as any);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (me.role === "user" || me.role === "admin") {
      navigate("/");
    }
  }, []);

  //   const [products, setProducts] = React.useState([]);
  //   const [columns, setColumns] = useState([]);
  // const axios = require("axios");
  // Fetch all products
  // useEffect(() => {
  //   console.log("in use effect");

  // Step 3: Fetch data using Axios
  // axios
  //   .get("https://fakestoreapi.com/products")
  //   .then((response) => {
  //     if (response.data.length > 0) {
  //       const dynamicColumns: any = Object.keys(response.data[0]).map(
  //         (key) => ({
  //           title: key.charAt(0).toUpperCase() + key.slice(1),
  //           dataIndex: key,
  //           key: key,
  //         })
  //       );
  const columns = [
    {
      title: "logo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (logoUrl: any) => {
        return <Image width={200} src={logoUrl} />;
      },
    },
    {
      title: "ลำดับ",
      dataIndex: "id",
      key: "id",
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "ชื่อองค์กร",
      dataIndex: "businessNameTH",
      key: "businessNameTH",
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
      title: "active",
      dataIndex: "active",
      key: "active",
      render: (active: any) => (active ? "พร้อมใช้งาน" : "ไม่พร้อมใช้งาน"),
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

  // Add a custom column for the details button
  // dynamicColumns.push({
  //   title: "รายละเอียด",
  //   key: "details",
  //   render: () => (
  //     <Button
  //       style={{ fontSize: "16px", width: "180px" }}
  //       type="primary"
  //       icon={<EyeOutlined />}
  //     >
  //       ดูข้อมูล
  //     </Button>
  //   ),
  // });

  //     setColumns(dynamicColumns);
  //     setProducts(response.data); // Update the state with the fetched data
  //   }
  // })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []); // Empty dependency array means this effect runs once after the initial render
  // console.log(products);

  // const { organize } = useLoaderData() as any;
  const [searchValue, setSearchValue] = React.useState<string>("");

  const onSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
  };

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
    </div>
  );
};
