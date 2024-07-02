import {  Input, Pagination,Button, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { TableComponent } from "@src/components/shared/TableComponent";
import { CreateButton } from "@src/components/shared/CreateButton";
import { data } from "./notationData";

export const NotationIndex = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "nummer",
      key: "nummer",
      sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id,
    },
    {
      title: "รูปภาพ",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string | undefined) => <Image width={100} src={imageUrl} alt="รูปภาพ" />,
    },
    {
      title: "ชื่อเอกสาร",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Active",
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
        <Button
          type="link"
          onClick={() => navigate("/customers/singlecustomers")}
        >
          ดูข้อมูล
        </Button>
      ),
    },
  ];

  const onSearch = (value: any) => {
    console.log(value);
  };

  return (
    <>
      <h1>ข้อมูลเอกสาร</h1>
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
        <Link to={""}>
          <CreateButton label={"เพิ่มเอกสาร"} />
        </Link>
      </div>
      <TableComponent
        columns={columns}
        pagination={false}
        bordered={false}
        dataSource={data}
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

export default NotationIndex;
