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
  UserAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/utotech-logo.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const UtotechLayout = (props: any) => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  // const [activekey, setActivekey] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  return (
    <>
      <Layout style={{ display: "flex", height: "100vh" }}>
        {/* <Sider
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
              // height: "calc(100vh - 140px)",
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
                label: "Dashboard",
                key: "/",
                icon: <HomeOutlined />,
              },
              {
                style: {
                  backgroundColor: ThemeColors.brickOrangeColor,
                  margin: "4px",
                },
                label: "Income",
                key: "",
                icon: <DollarOutlined />,
                children: [
                  {
                    key: "/quotation",
                    label: "Quotaion",
                    icon: <FileDoneOutlined />,
                  },
                ],
              },
              {
                style: { backgroundColor: ThemeColors.brickOrangeColor },
                label: "Users",
                key: "/users",
                icon: <TeamOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.brickOrangeColor },
                label: "Organozation",
                key: "/organozation",
                icon: <ShoppingOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.brickOrangeColor },
                label: "Product",
                key: "/product",
                icon: <ShoppingCartOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.brickOrangeColor },
                label: "Partial",
                key: "/partial",
                icon: <WalletOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.brickOrangeColor },
                label: "Customers",
                key: "/customers",
                icon: <UserAddOutlined />,
              },
            ]}
          ></Menu>
        </Sider> */}
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              display: "flex",
              top: 0,
              zIndex: 1,
              width: "100%",
              height: "100px",
              position: "sticky",
              backgroundColor: ThemeColors.whiteColor,
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0.5px 0.5px 0.5px 0.5px grey",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Button type="link">
                <Image
                  src={Logo}
                  width={60}
                  height={60}
                  preview={false}
                ></Image>
              </Button>
            </div>

            <Row align={"middle"}>
              <Button size={"middle"} type="link" style={{ color: "black" }}>
                Project
              </Button>
              <Button size={"middle"} type="link" style={{ color: "black" }}>
                About
              </Button>
              <Button size={"middle"} type="link" style={{ color: "black" }}>
                Contact
              </Button>
            </Row>
          </Header>

          <Content
            style={{ backgroundColor: ThemeColors.bgColor, overflow: "auto" }}
          >
            <div
              style={{
                paddingTop: 36,
                paddingLeft: "10%",
                paddingRight: "10%",
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
