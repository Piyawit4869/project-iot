import React from "react";
import {
  Layout,
  Menu,
  Image,
  Space,
  Typography,
  Row,
  Col,
  Card,
  Button,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/stay_logo.png";
import sidebar from "../assets/images/abstract_sidebar.png";

import { Menus } from ".";
import {
  ScheduleOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(false);

  const { Sider } = Layout;

  const handleMenuClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const me = JSON.parse(localStorage.getItem("me") as any);
  const menusWithOnClick = Menus({ role: me.role }).map((menu) => ({
    ...menu,
    onClick: handleMenuClick,
  }));

  React.useEffect(() => {
    const key = location.pathname.split("/") as any[];
    if (key.length) {
      const newActiveKey =
        key[1] === "admin"
          ? key[2]
            ? `${key[2]}`
            : ""
          : key[1]
          ? `${key[1]}`
          : "";
      setActiveKey(newActiveKey);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <Sider
        width={200}
        theme="light"
        collapsible={true}
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
        }}
        style={{
          position: isMobile ? "fixed" : "relative",
          zIndex: 10,
          height: "100vh",
          backgroundColor: "#19142A",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${sidebar})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />

        <Row
          justify="center"
          align="middle"
          gutter={[12, 12]}
          style={{
            marginTop: "15px",
          }}
        >
          <Col>
            <Image preview={false} src={logo} width={30} />
          </Col>
          <Col>
            <Typography style={{ color: "white", fontSize: "24px" }}>
              StayOrganize
            </Typography>
          </Col>
        </Row>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeKey]}
          defaultOpenKeys={["/"]}
          style={{
            backgroundColor: "transparent",
            marginTop: "60px",
            overflow: "auto",
          }}
          items={menusWithOnClick}
        />

        <Card
          style={{
            position: collapsed ? "relative" : "absolute",
            bottom: 0,
            margin: "5px",
            background: "transparent",
            borderColor: "transparent",
          }}
          bodyStyle={{ padding: "5px" }}
        >
          <Typography style={{ color: "white" }}>General</Typography>
          <div
            style={{ margin: 10, height: "2px", backgroundColor: "#0293F1" }}
          />
          <div>
            <Link to="/">
              <Space>
                <UserOutlined style={{ color: "white" }} />
                <Typography style={{ color: "white" }}>Profile</Typography>
              </Space>
            </Link>
          </div>
          <div>
            <Link to="/">
              <Space>
                <SettingFilled style={{ color: "white" }} />
                <Typography style={{ color: "white" }}>Setting</Typography>
              </Space>
            </Link>
          </div>

          <Typography style={{ color: "white", marginTop: "20px" }}>
            StayOrganize Feature
          </Typography>
          <div
            style={{ margin: 10, height: "2px", backgroundColor: "#0293F1" }}
          />
          <Button
            size="small"
            icon={<ScheduleOutlined />}
            style={{ width: "100%" }}
          >
            Attendence
          </Button>
          <Button
            size="small"
            icon={<ScheduleOutlined />}
            style={{ width: "100%" }}
          >
            Notation report
          </Button>
          <Button
            size="small"
            icon={<ScheduleOutlined />}
            style={{ width: "100%" }}
          >
            Kanban board
          </Button>
          <div
            style={{ margin: 10, height: "2px", backgroundColor: "#0293F1" }}
          />
          <Card.Meta
            avatar={
              <Image
                src="https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg"
                preview={false}
                width={40}
                style={{ borderRadius: "20px", marginTop: 5 }}
              />
            }
            // avatar="https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg"
            title={
              <Typography.Title style={{ color: "white", margin: 0 }} level={5}>
                Super admin
              </Typography.Title>
            }
            description={
              <Typography style={{ color: "white" }}>Role : Admin</Typography>
            }
          />
        </Card>
      </Sider>
      {isMobile && collapsed == false && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9,
          }}
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
};
