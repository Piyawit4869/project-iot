import { OrganizeEditForm } from "@src/forms";

import * as API from "@src/apis";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { Button, Input, Table, notification } from "antd";
import {
  EyeOutlined,
  PlusCircleFilled,
  SearchOutlined,
  TagOutlined,
} from "@ant-design/icons";

// get API loader
export async function organizeSingleLoader({ params }: any) {
  console.log(params);

  try {
    const organize = await API.organize.get(params.id);
    return { organize: organize.data.data };
  } catch (error) {
    return { error: "error", message: error };
  }
}

export async function organizeSingleAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  switch (submitData.action) {
    case "edit":
      try {
        await API.organize.update(params.id, JSON.parse(submitData.data));
        notification["success"]({
          message: "แก้ไขข้อมูลองค์กรเสร็จสิ้น",
          placement: "top",
          duration: 3,
        });
        return redirect(`/admin/organize/${params.id}`);
      } catch (error) {
        notification["error"]({
          message: "แก้ไขข้อมูลองค์กรล้+มเหลว",
          placement: "top",
          duration: 3,
        });
        return {
          data: {
            action: "create",
            status: "error",
            message: "Organize Created Failed !",
          },
        };
      }
    case "delete":
      try {
        await API.organize.deleted(params.id);
        notification["success"]({
          message: "ลบข้อมูลองค์กรเสร็จสิ้น",
          placement: "top",
          duration: 3,
        });
        return redirect("/admin/organize");
      } catch (error) {
        notification["error"]({
          message: "ลบข้อมูลองค์กรล้มเหลว",
          placement: "top",
          duration: 3,
        });
        return {
          data: {
            action: "create",
            status: "error",
            message: "Organize Created Failed !",
          },
        };
      }
    default:
      break;
  }
}
const columns = [
  {
    title: "ลำดับ",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "ชื่อองค์กร",
    dataIndex: "businessName",
    key: "businessName",
  },
  {
    title: "ประเภทธุรกิจ",
    dataIndex: "businessType",
    key: "businessType",
  },
  {
    title: "โมเดล",
    dataIndex: "businessModel",
    key: "businessModel",
  },
  {
    title: "ประเภทสาขา",
    dataIndex: "branchType",
    key: "branchType",
  },
  {
    title: "โทรศัพท์",
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    title: "อีเมลล์",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "เว็บไซต์",
    dataIndex: "websiteUrl",
    key: "websiteUrl",
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
export const OrganizeSingle: React.FC = () => {
  const { organize } = useLoaderData() as any;

  return (
    <div>
      <OrganizeEditForm initialValues={organize} />

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
            เพิ่มข้อมูลสาขา
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
          // value={searchValue}
          // onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 304 }}
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          // onClick={() => onSearch(searchValue)}
        >
          ค้นหา
        </Button>
      </div>
      <Table
        columns={columns}
        // dataSource={dataSource}
        // columns={columns}
        // dataSource={products}
        dataSource={organize?.items ? organize?.items : []}
        pagination={false}
        bordered
      />
    </div>
  );
};
