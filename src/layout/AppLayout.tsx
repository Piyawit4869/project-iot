import { Button, Image, Layout, Menu, Row, Typography } from "antd";
import {
  DollarOutlined,
  FileDoneOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/Logo-StayOrganized.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const AppLayout = (props: any) => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  // const [activekey, setActivekey] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  // React.useEffect(() => {
  //   const key = location.pathname.split("/") as any[];

  //   if (key.length) {
  //     if (Number(key[2]) > 0) {
  //       setActivekey(key[1] ? `${key[1]}` : "");
  //     } else {
  //       setActivekey(`${key[1]}${key[2] ? `/${key[2]}` : ""} `);
  //     }
  //   }
  // }, [location.pathname]);

  return (
    <>
      <Layout style={{ display: "flex", height: "100vh" }}>
        <Sider
          style={{
            backgroundColor: ThemeColors.primaryColor,
          }}
          width={230}
          breakpoint="sm"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Image width={50} src={Logo} preview={false} />
            {collapsed ? (
              <div style={{ height: "100px" }}></div>
            ) : (
              <div style={{ height: "100px" }}>
                <Typography style={{ fontSize: "24px", color: "white" }}>
                  Stay-Organize
                </Typography>
              </div>
            )}
          </div>
          <Menu
            selectedKeys={[location.pathname]}
            selectable={true}
            theme="light"
            mode="inline"
            style={{
              width: "100%",
              height: "calc(100vh - 140px)",
              top: "170px",
              backgroundColor: ThemeColors.primaryColor,
              color: "white",
            }}
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                style: { backgroundColor: ThemeColors.brickOrangeColor },
                label: "dashboard",
                key: "/",
                icon: <HomeOutlined />,
              },
              {
                style: {
                  backgroundColor: ThemeColors.brickOrangeColor,
                  margin: "4px",
                },
                label: "income",
                key: "",
                icon: <DollarOutlined />,
                children: [
                  {
                    key: "/quotation",
                    label: "quotaion",
                    icon: <FileDoneOutlined />,
                  },
                ],
              },
              {
                style: { backgroundColor: ThemeColors.orangeColor },
                label: "users",
                key: "/users",
                icon: <TeamOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.orangeColor },
                label: "organozation",
                key: "/organozation",
                icon: <ShoppingOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.orangeColor },
                label: "product",
                key: "/product",
                icon: <ShoppingCartOutlined />,
              },
            ]}
          ></Menu>
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              padding: "20px",
              display: "flex",
              top: 0,
              zIndex: 1,
              width: "100%",
              height: "60px",
              position: "sticky",
              backgroundColor: ThemeColors.whiteColor,
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0.5px 0.5px 0.5px 0.5px grey",
            }}
          >
            <Button
              size={"middle"}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                backgroundColor: ThemeColors.orangeColor,
                color: "white",
              }}
            ></Button>
            <Row align={"middle"}>
              <Typography style={{ fontSize: "24px", marginRight: "10px" }}>
                User name
              </Typography>
              <Button
                icon={<SettingOutlined />}
                size={"middle"}
                style={{
                  backgroundColor: ThemeColors.orangeColor,
                  color: "white",
                }}
              ></Button>
            </Row>
          </Header>

          <Content
            style={{ backgroundColor: ThemeColors.bgColor, overflow: "auto" }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
      {/* FIXME: create new footer */}
    </>
  );
};
