import React from "react";
import { Layout, Menu, Image, Typography, Row, Col, Card, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { CheckOutlined } from '@ant-design/icons';
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
            <Link to="http://localhost:8080/">
              <Image preview={false} src={logo} width={collapsed ? 40 : 70} />
            </Link>
          </Col>
        </Row>

        {!collapsed && (
          <Row
            justify="center"
            align="middle"
            gutter={[12, 12]}
            style={{
              marginTop: "10px",
              marginBottom: "-10px",
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
              className="upgrade-button"
            >
              <Link to="/upgrade"> Upgrade </Link>
            </Button>
          </Card>
        )}
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "-70px",
            zIndex: 1000,
            backgroundColor: "#F3F3F3",
            borderRadius: "2px",
            width: "70px",
            height: "40px",
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
            background: "#19142A",
            zIndex: 9,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};
export default Sidebar;
