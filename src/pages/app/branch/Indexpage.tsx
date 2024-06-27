import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Input, Pagination, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { TableComponent } from "@src/components/shared/TableComponent";

export const BranchIndex: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "nummer",
      key: "nummer",
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "ชื่อโปรเจต",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
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
      title: "ลิ้งค์รูปภาพ",
      dataIndex: "imageUrl",
      key: "imageUrl",
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
      dataIndex: "details",
      key: "details",
      render: () => (
        <Button type="link" onClick={() => navigate("/branch/singlebranch")}>
          ดูข้อมูล
        </Button>
      ),
    },
  ];

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate("/branch")}>
              ข้อมูลสาขา
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <h1>ข้อมูลสาขา</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Input.Search
          placeholder="Search Project"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => navigate("/branch/createbranch")}>
          เพิ่มข้อมูลสาขา
        </Button>
      </div>
      <TableComponent
        columns={columns}
        pagination={false}
        bordered={false}
        dataSource={undefined}
      />
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

export default BranchIndex;
