import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";
import { Button, Dropdown, Form, Input, MenuProps, Space, Table, Typography } from "antd";
import { ControlFilled, DownOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";


interface Datatype {
  key: String;
  customerName: String,
  ioNumber: String,
  tell: String,

}

export const CustomersPage = () => {

  const dataTable: Datatype[] = [
    {
      key: "1",
      customerName: "Pitoooo",
      ioNumber: "01225471023214",
      tell: "099 888 7712"
    },
    {
      key: "2",
      customerName: "Pitoooo",
      ioNumber: "01225471023214",
      tell: "099 888 7712"
    },
    {
      key: "3",
      customerName: "Pitoooo",
      ioNumber: "01225471023214",
      tell: "099 888 7712"
    },
    {
      key: "4",
      customerName: "Pitoooo",
      ioNumber: "01225471023214",
      tell: "099 888 7712"
    },

  ];

  const columns: ColumnsType<Datatype> = [
    {
      key: "key",
      render: (key: any) => (
        <EyeOutlined
          style={{ fontSize: "26px", color: ThemeColors.grayColor }}
          onClick={() => {
            <Link
              to="/customers/update/"
            />
            console.log("/customers/update/" + key.key)

          }}
        />
      ),
      width: "80px"
    },

    {
      dataIndex: "key",
      key: "key",
      render: (customerName: String) => (
        <p style={{ color: ThemeColors.goldColor }}>{customerName}</p>
      ),
      width: "10px"

    },
    {
      title: "ชื่อกิจการ",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName: String) => (
        <p style={{ color: ThemeColors.goldColor }}>{customerName}</p>
      ),
      align: "left"

    },
    {
      title: "เลขนิติบุลคล/เลขผู้เสียภาษี",
      dataIndex: "ioNumber",
      key: "ioNumber",

    },
    {
      title: "เบอร์โทร",
      dataIndex: "tell",
      key: "tell",

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

  return <div>
    {Title("ตั้งค่าข้อมูลลูกค้า", false, "")}
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
            width: "150px",
            height: "75px",
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
                    width: "85%",
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
        <Link to="/customers/create">
          <Button
            style={{
              border: "0",
              textAlign: "left",
              width: "180px",
              height: "75px",
              fontSize: "18px",
              color: ThemeColors.whiteColor,
              backgroundColor: ThemeColors.darkorangeColor,
              boxShadow: "2px 2px 5px 2px" + ThemeColors.grayColor,
            }}
            icon={<PlusOutlined style={{ fontSize: "28px" }} />}
          >
            เพิ่มลูกค้าใหม่
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
}