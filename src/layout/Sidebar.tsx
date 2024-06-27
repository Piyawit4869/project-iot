import React from "react";
import { Layout, Menu, Image, Typography, Row, Col, Card, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { CheckOutlined } from '@ant-design/icons'; // Import the icon you need
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
    const key = location.pathname.split("/");
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
        collapsedWidth={80}
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
          style={{
            marginTop: "10px",
          }}
        >
          <Col>
            <Image preview={false} src={logo} width={collapsed ? 40 : 70} />
          </Col>
        </Row>

        {!collapsed && (
          <Row
            justify="center"
            align="middle"
            gutter={[12, 12]}
            style={{
              marginTop: "10px",
              marginBottom: "-10px", // Adjust this value to move the text up
            }}
          >
            <Col>
              <Typography style={{ color: "#19142A", fontSize: "20px" }}>
                บริษัท ยูโทเทค จำกัด
              </Typography>
            </Col>
          </Row>
        )}

        <div style={{ marginTop: collapsed ? "40px" : "0px" }}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[activeKey]}
            defaultOpenKeys={["/"]}
            style={{
              backgroundColor: "#F7F7F7",
              marginTop: collapsed ? "0px" : "60px",
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
        </div>
        {!collapsed && (
          <Card
            style={{
              position: "absolute",
              bottom: "50px",
              margin: "5px",
              background: "#F7F7F7",
              borderColor: "#F7F7F7",
              width: "calc(100% - 10px)",
              borderRadius: "10px",
            }}
            bodyStyle={{ padding: "10px", textAlign: "center" }}
          >
            <Typography style={{ fontWeight: "bold", color: "#19142A" }}>
              บริษัท ยูโทเทค จำกัด
            </Typography>
            <Typography style={{ color: "#19142A", opacity: 0.6 }}>
            STAY ORGANIZED
            </Typography>
            <Button
              type="primary"
              block
              style={{
                marginTop: "10px",
                backgroundColor: "#19142A",
                borderColor: "#19142A",
                borderRadius: "5px",
              }}
            >
             <Link to="/upgrade"> Upgrade </Link> 
            </Button>
          </Card>
        )}
<div
  style={{
    position: "absolute",
    top: "25px", // Add some margin from the top
    right: "-70px", // Adjust this value if needed
    zIndex: 1000,
    backgroundColor: "#f0f0f0",
    borderRadius: "2px", // Rounded corners
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    width: "70px", // Adjust the width to fit your design
    height: "40px", // Adjust the height to fit your design
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  }}
  onClick={() => setCollapsed(!collapsed)}
>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
    <CheckOutlined style={{ fontSize: "16px", color: "#8C8C8C" }} />
    <span style={{ marginLeft: "10px", fontSize: "5px", color: "#8C8C8C" }}>...</span>
  </div>
</div>
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