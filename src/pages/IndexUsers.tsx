import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";

import {
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  ControlFilled,
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
  fname: String;
  lname: String;
  role: String;
  phone: String;
  email: String;
  createDate: String;
  lastActive: String;
  status: String | any;
  // status: any;
}

export const UsersPage = () => {
  const dataTable: Datatype[] = [
    {
      key: "1",
      fname: "pitoo",
      lname: "too too too too",
      role: "ผู้ดูแลระบบสูงสุด",
      phone: "099-0000000",
      email: "pitoo@email.com",
      createDate: "30/07/66",
      lastActive: "01/08/66 21:31",
      status: "Active",
    },
    {
      key: "2",
      fname: "เกียรติภูมิ",
      lname: "พูลเขตร์กิจ",
      role: "ผู้ดูแลระบบ",
      phone: "088-8666666",
      email: "kittiphoom@email.com",
      createDate: "01/08/66",
      lastActive: "01/08/66 21:31",
      status: "Inactive",
    },
    {
      key: "3",
      fname: "ภัทรดา",
      lname: "พร้อมกิจจานนท์",
      role: "ผู้ดูแลระบบ",
      phone: "088-8669966",
      email: "padrada.ttpp@email.com",
      createDate: "11/08/66",
      lastActive: "01/08/66 21:31",
      status: "Pending",
    },
    {
      key: "4",
      fname: "Taksin",
      lname: "Shinnawat",
      role: "ผู้ดูแลระบบสูงสุด",
      phone: "088-0112365",
      email: "Takky@email.com",
      createDate: "04/06/66",
      lastActive: "19/08/66 12:31",
      status: "Inactive",
    },
    {
      key: "5",
      fname: "Tootoo",
      lname: "Toomaleaw",
      role: "ผู้ดูแลระบบสูงสุด",
      phone: "088-4444444",
      email: "M44ORM16?@email.com",
      createDate: "30/07/66",
      lastActive: "01/08/66 21:31",
      status: "Active",
    },
  ];

  const columns: ColumnsType<Datatype> = [
    {
      title: "",
      dataIndex: "key",
      render: () => (
        <EyeOutlined
          style={{ fontSize: "26px", color: ThemeColors.grayColor }}
        />
      ),
    },
    {
      title: "ชื่อจริง",
      dataIndex: "fname",
      key: "fname",
      render: (fname: String) => (
        <p style={{ color: ThemeColors.goldColor }}>{fname}</p>
      ),
      responsive: ["md"],
    },
    {
      title: "นามสกุล",
      dataIndex: "lname",
      key: "lname",
      render: (lname: String) => (
        <p style={{ color: ThemeColors.goldColor }}>{lname}</p>
      ),
    },
    {
      title: "บทบาท",
      dataIndex: "role",
      key: "role",
      render: (role: String) => (
        <p style={{ color: ThemeColors.blackColor }}>{role}</p>
      ),
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
      render: (role: String) => (
        <p style={{ color: ThemeColors.grayColor }}>{role}</p>
      ),
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
      responsive: ["md", "lg"],
      render: (email: String) => (
        <p
          style={{
            color: ThemeColors.grayColor,
          }}
        >
          {email}
        </p>
      ),
    },
    {
      title: "สร้างเมื่อ",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate: String) => (
        <p style={{ color: ThemeColors.grayColor }}>{createDate}</p>
      ),
    },
    {
      title: "การใช้งานล่าสุด",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (lastActive: String) => (
        <p style={{ color: ThemeColors.grayColor }}>{lastActive}</p>
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status: String) =>
        status === "Active" ? (
          <p style={{ color: "#22BE7D" }}>{status}</p>
        ) : status === "Inactive" ? (
          <p style={{ color: "#EA5959" }}>{status}</p>
        ) : (
          <p style={{ color: "#F0BA3D" }}>{status}</p>
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
      {Title("ตั้งค่าผู้ใช้งาน", false, "")}
      <div style={{ display: "flex", marginBottom: "20px" }}>
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
      <div className="statusbar" style={{ display: "grid", gap: "2rem" }}>
        <div style={{ display: "flex" }}>
          <div style={{ color: "red" }}>
            <ControlFilled
              onClick={() => console.log("Fillllltttteerrr")}
              rotate={90}
              style={{
                color: ThemeColors.orangeColor,
                fontSize: "50px",
                margin: "20px 10px 15px 0px",
              }}
            />
          </div>
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
              boxShadow: "2px 2px 5px 2px" + ThemeColors.goldColor,
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
          <Link to="/createuser">
            <Button
              style={{
                border: "0",
                textAlign: "left",
                width: "205px",
                height: "80px",
                fontSize: "18px",
                color: ThemeColors.whiteColor,
                backgroundColor: ThemeColors.darkorangeColor,
                boxShadow: "2px 2px 5px 2px" + ThemeColors.grayColor,
              }}
              icon={<PlusOutlined style={{ fontSize: "28px" }} />}
            >
              เพิ่มผู้ใช้งานใหม่
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Table
          size="middle"
          columns={columns}
          dataSource={dataTable}
          style={{
            marginTop: "40px",
            textAlign: "center",
            wordWrap: "normal",
          }}
        />
      </div>
      {/* <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
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
