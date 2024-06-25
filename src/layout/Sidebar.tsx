import React from "react";
import { Layout, Menu, Image, Typography, Row, Col, Card, Button } from "antd";
import { useLocation } from "react-router-dom";
import logo from "../assets/images/logoutotechV2.png";
import sidebar from "../assets/images/abstract_sidebar.png";
import { Menus } from ".";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(false);

  const handleMenuClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const me = JSON.parse(localStorage.getItem("me") || "{}");
  const menusWithOnClick = Menus({ role: me.role }).map((menu: any) => ({
    ...menu,
    onClick: handleMenuClick,
  }));

  // Reorder menusWithOnClick to ensure "Organize" is always at the top
  const reorderedMenus = [
    ...menusWithOnClick.filter((menu) => menu.key === "organize"),
    ...menusWithOnClick.filter((menu) => menu.key !== "organize"),
  ];

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
            marginTop: "10px",
          }}
        >
          <Col>
            <Image preview={false} src={logo} width={70} />
          </Col>
          <Col>
            <Typography style={{ color: "#19142A", fontSize: "20px" }}>
              บริษัท ยูโทเทค จำกัด
            </Typography>
          </Col>
        </Row>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeKey]}
          defaultOpenKeys={["/"]}
          style={{
            backgroundColor: "#F7F7F7",
            marginTop: "60px",
            overflow: "auto",
          }}
        >
          {reorderedMenus.map((menu) =>
            menu.divider ? (
              <Menu.Divider key={menu.key} />
            ) : menu.children ? (
              <SubMenu key={menu.key} icon={menu.icon} title={menu.label}>
                {menu.children.map((subMenu: any) => (
                  <Menu.Item key={subMenu.key}>{subMenu.label}</Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={menu.key} icon={menu.icon}>
                {menu.label}
              </Menu.Item>
            )
          )}
        </Menu>
        <Card
          style={{
            position: collapsed ? "relative" : "absolute",
            bottom: 0,
            margin: "5px",
            background: "#F7F7F7",
            borderColor: "#F7F7F7",
            width: "calc(100% - 10px)",
          }}
          bodyStyle={{ padding: "10px" }}
        >
          <Typography style={{ textAlign: "center", fontWeight: "bold" }}>
            บริษัท ยูโทเทค จำกัด
          </Typography>
          <Typography style={{ textAlign: "center", color: "#19142A" }}>
            STAY ORGANIZED
          </Typography>
          <Button
            href="/upgrade"
            type="primary"
            block
            style={{
              marginTop: "10px",
              backgroundColor: "#19142A",
              borderColor: "#19142A",
            }}
          >
            Upgrade
          </Button>
        </Card>
      </Sider>
      {isMobile && collapsed === false && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(40, 16, 72, 0.7)",
            zIndex: 9,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};

export default Sidebar;
