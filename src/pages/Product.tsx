import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";

import {
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Input,
  Button,
  Dropdown,
  Space,
  MenuProps,
  Typography,
  Form,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface Datatype {
  key: String;
  productname: String;
  description: String;
  type: String;
  count: number;
  price: String;

  // status: any;
}

export const ProductPage = () => {
  const dataTable: Datatype[] = [
    {
      key: "1",
      productname: "การออกแบบ",
      description: "การออกแบบ Flow Chart และ User Journey ของระบบ",
      type: "บริการ",
      count: 4,
      price: "10,000",
    },
    {
      key: "2",
      productname: "ถางหญ้าหน้าบ้านพระอิน",
      description: "ถางหญ้าออก",
      type: "บริการ",
      count: 1,
      price: "600,000",
    },
    {
      key: "3",
      productname: "ให้อาหารช้าง",
      description: "ให้ช้างแดกข้าว",
      type: "บริการ",
      count: 1,
      price: "10,000,000",
    },
    {
      key: "4",
      productname: "ขี่ช้างไล่จับไดโนเสาร์",
      description: "พาช้างไปวิ่งเล่น",
      type: "บริการ",
      count: 6,
      price: "60,711,452",
    },
    {
      key: "5",
      productname: "ออกแบบแอปพลิเคชั่นสำรวจดาวอังคาร",
      description: "การออกแบบ Flow และ Agenda คร่าว ๆ ในการส่ง",
      type: "บริการ",
      count: 1,
      price: "970,003,654",
    },
  ];

  const columns: ColumnsType<Datatype> = [
    {
      title: "",
      dataIndex: "key",
      render: (key: String) => (
        <p style={{ color: ThemeColors.orangeColor }}>{key}</p>
      ),
    },
    {
      title: "ชื่อสินค้า/บริการ",
      dataIndex: "productname",
      key: "productname",
      render: (productname: String) => (
        <p style={{ color: ThemeColors.orangeColor }}>{productname}</p>
      ),
    },
    {
      title: "คำอธิบาย",
      dataIndex: "description",
      key: "description",
      render: (description: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{description}</p>
      ),
    },
    {
      title: "ประเภท",
      dataIndex: "type",
      key: "type",
      render: (type: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{type}</p>
      ),
    },
    {
      title: "จำนวน",
      dataIndex: "count",
      key: "count",
      render: (count: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{count}</p>
      ),
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <p style={{ color: ThemeColors.blackColor }}>{price}</p>
      ),
    },
    {
      render: (key: any) => (
        <Link to={`/updateproduct`}>
          <Button
            onClick={() => console.log(key.key)}
            style={{
              backgroundColor: ThemeColors.orangeColor,
              color: ThemeColors.whiteColor,
              border: "0px",
              height: "40px",
              width: "100px",
            }}
            icon={<EditOutlined style={{ fontSize: "18px" }} />}
          >
            แก้ไข
          </Button>
        </Link>
      ),
    },
  ];

  const itemdropdown: MenuProps["items"] = [
    {
      label: "ทั้งหมด",
      key: "1",
    },
    {
      label: "ร่าง",
      key: "2",
    },
    {
      label: "รออนุมัติ",
      key: "3",
    },
    {
      label: "รอตอบรับ",
      key: "4",
    },
    {
      label: "ตอบรับแล้ว",
      key: "5",
    },
  ];

  const onClickItemDropdown: MenuProps["onClick"] = ({ key }) => {
    console.log("key", key);
  };

  return (
    <div>
      {Title("ส้นค้า/บริการ", false, "")}
      <Typography>
        ข้อมูลสินค้าและบริการขององค์กร และข้อมูลที่อยู่เพื่อใช้แสดงในหน้าเอกสาร
      </Typography>
      <div style={{ display: "flex", marginBottom: "20px", marginTop: "20px" }}>
        <Input
          style={{ width: "90%", marginRight: "10px" }}
          size="large"
          placeholder="ค้นหาชื่อผู้ใช้งาน"
          prefix={<SearchOutlined />}
        />
        <Button
          style={{
            textAlign: "left",
            width: "120px",
            height: "38px",
            color: ThemeColors.whiteColor,
            backgroundColor: ThemeColors.orangeColor,
          }}
          icon={<SearchOutlined />}
        >
          ค้นหา
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <div
          className="status"
          style={{
            width: "190px",
            height: "80px",
            backgroundColor: "white",
            padding: "10px 0 0 10px",
            marginRight: "20px",
            borderRadius: "10px",
            // boxShadow: "2px 2px 2px 3px",
            boxShadow: "2px 2px 5px 2px" + ThemeColors.grayColor,
          }}
        >
          <Typography style={{ fontSize: "1.3rem" }}>สถานะ</Typography>
          <Form.Item>
            <Dropdown
              menu={{ items: itemdropdown, onClick: onClickItemDropdown }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  style={{
                    width: "75%",
                    display: "flex",
                    justifyContent: "space-between",
                    color: ThemeColors.lightOrangeColor,
                  }}
                >
                  ทั้งหมด
                  <DownOutlined style={{ fontSize: "22px", width: "10px" }} />
                </Space>
              </a>
            </Dropdown>
          </Form.Item>
        </div>
        <Link to="/createproduct">
          <Button
            style={{
              border: "0",
              textAlign: "left",
              width: "220px",
              height: "80px",
              fontSize: "18px",
              color: ThemeColors.whiteColor,
              backgroundColor: ThemeColors.darkorangeColor,
              boxShadow: "2px 2px 5px 2px" + ThemeColors.grayColor,
            }}
            icon={<PlusOutlined style={{ fontSize: "28px" }} />}
          >
            เพิ่มสินค้าและบริการ
          </Button>
        </Link>
      </div>
      <div>
        <Table
          size="middle"
          pagination={false}
          columns={columns}
          dataSource={dataTable}
          style={{ marginTop: "40px", textAlign: "center" }}
        />
      </div>
      {/* <div
        style={{
          marginTop: "10px",
          display: "flex",
          float: "right",
        }}
      >
        <Typography style={{ fontSize: "18px", margin: "2px 10px 0 0 " }}>
          แสดง
        </Typography>
        <Dropdown menu={menuProps}>
          <Button
            style={{
              marginRight: "10px",
              border: "0px",
              fontSize: "18px",
            }}
          >
            <Space
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-between",
                color: ThemeColors.orangeColor,
              }}
            >
              10
              <DownOutlined style={{ fontSize: "18px" }} />
            </Space>
          </Button>
        </Dropdown>
        <Typography style={{ fontSize: "18px", margin: "2px 10px 0 0 " }}>
          รายการ
        </Typography>
        <Button
          style={{
            marginRight: "10px",
            border: "0px",
            fontSize: "18px",
            color: ThemeColors.orangeColor,
          }}
          icon={<LeftOutlined />}
        />
        <Typography style={{ fontSize: "18px", margin: "2px 10px 0 0 " }}>
          หน้า
        </Typography>
        <Button
          style={{
            marginRight: "10px",
            border: "0px",
            fontSize: "18px",
            textAlign: "right",
          }}
        >
          <Space
            style={{
              textAlign: "right",
              width: "80px",
              display: "flex",
              justifyContent: "space-between",
              color: ThemeColors.orangeColor,
            }}
          >
            1
          </Space>
        </Button>
        <Button
          style={{
            border: "0px",
            fontSize: "18px",
            color: ThemeColors.orangeColor,
          }}
          icon={<RightOutlined />}
        />
      </div> */}
    </div>
  );
};
