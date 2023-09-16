import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import {
  CalculatorOutlined,
  ControlOutlined,
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ThemeColors } from "../styles/theme";
import { Title } from "../components/global/Title";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";

export const IndexPartialPage = () => {
  interface DataType {
    key: React.Key;
    name: string;
    amout: number;
    cost: number;
    status: boolean;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ชื่อโครงการ",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Typography style={{ color: ThemeColors.orangeColor }}>
          {name}
        </Typography>
      ),
    },
    {
      title: "จำนวนผู้รับผิดชอบ (คน)",
      dataIndex: "amout",
      key: "amout",
    },
    {
      title: "มูลค่าโครงการ (บาท)",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "ดำเนินการ" : "สำเร็จ"),
    },

    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Link to="/partial/create">
          <Button
            onClick={() => {}}
            style={{ backgroundColor: ThemeColors.orangeColor }}
          >
            <Row align="middle">
              <CalculatorOutlined
                style={{ color: "white", fontSize: "18px", marginRight: "5px" }}
              />
              <Typography style={{ color: "white" }}>คำนวณ</Typography>
            </Row>
          </Button>
        </Link>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Stay-organize",
      amout: 8,
      cost: 4000000,
      status: true,
    },
    {
      key: "2",
      name: "Im-sud",
      amout: 4,
      cost: 100000,
      status: false,
    },
  ];

  const onClickCurrency: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const itemsCurrency: MenuProps["items"] = [
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

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      {Title("การชำระเงินโครงการ", false, "")}
      <Typography
        style={{
          fontSize: "16px",
          color: ThemeColors.grayColor,
          marginTop: "20px",
        }}
      >
        ข้อมูลโครงการที่จัดทำในองค์กร/กิจการ
        สามารถเพิ่มหรือจัดการคำนวณการชำระเงินในแต่ละโครงการได้
      </Typography>
      <Row style={{ marginTop: "20px" }} wrap={false}>
        <Input
          prefix={<SearchOutlined style={{ fontSize: "25px" }} />}
          placeholder="ค้นหาโครงการ"
          bordered={true}
          style={{
            paddingLeft: "10px",
            fontSize: "16px",
            color: ThemeColors.lightOrangeColor,
            border: "2px solid #EFAB3A",
            height: "50px",
            marginRight: "10px",
          }}
        />
        <Button
          style={{
            width: "10%",
            height: "50px",
            backgroundColor: "#EFAB3A",
            color: "white",
          }}
        >
          <Row align="middle" wrap={false}>
            <SearchOutlined style={{ fontSize: "25px", marginRight: "5px" }} />
            <Typography style={{ fontSize: "16px", color: "white" }}>
              ค้นหา
            </Typography>
          </Row>
        </Button>
      </Row>
      <Row style={{ marginTop: "10px" }} wrap={false} align="middle">
        <Button
          onClick={() => setCollapsed(!collapsed)}
          icon={
            collapsed ? (
              <ControlOutlined style={{ fontSize: "30px", color: "white" }} />
            ) : (
              <ControlOutlined style={{ color: "#EE9437", fontSize: "30px" }} />
            )
          }
          style={{
            backgroundColor: collapsed ? "#E46F1B" : "white",
            height: "40px",
            border: "0px",
          }}
        />
        <div
          style={{
            marginLeft: "15px",
            width: "15%",
            height: "70px",
            backgroundColor: "white",
            paddingTop: "10px",
            paddingLeft: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography
            style={{
              fontSize: "16px",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            สถานะ
          </Typography>
          <Form.Item>
            <Dropdown menu={{ items: itemsCurrency, onClick: onClickCurrency }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                    color: ThemeColors.lightOrangeColor,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    marginTop: "-17px",
                  }}
                >
                  -
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Form.Item>
        </div>
        <Link to="/partial/create">
          <Button
            type="primary"
            style={{
              width: "100%",
              height: "70px",
              backgroundColor: "#E46F1B",
              fontSize: "16px",
              marginLeft: "10px",
            }}
          >
            <Row align="middle" wrap={false}>
              <PlusOutlined style={{ fontSize: "25px" }} />
              <Typography style={{ fontSize: "16px", color: "white" }}>
                เพิ่มโครงการ
              </Typography>
            </Row>
          </Button>
        </Link>
      </Row>
      {collapsed ? (
        <div></div>
      ) : (
        <div style={{ height: "80px" }}>
          <Button
            style={{
              background: "white",
              border: "0px",
              height: "70px",
              marginTop: "10px",
              width: "10%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography style={{ fontSize: "14px", textAlign: "center" }}>
              เลขที่เอกสาร
              <Typography
                style={{
                  color: "#EE9437",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                QO-23200107000
              </Typography>
            </Typography>
          </Button>
          <Button
            style={{
              marginLeft: "10px",
              background: "white",
              border: "0px",
              height: "70px",
              width: "10%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography style={{ fontSize: "14px", textAlign: "center" }}>
              ลูกค้า
              <Typography
                style={{
                  color: "#EE9437",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Sim
              </Typography>
            </Typography>
          </Button>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "15px" }}
      />
      ;
    </div>
  );
};
