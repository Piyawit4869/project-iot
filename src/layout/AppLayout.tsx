import { Button, Image, Layout, Menu, Row, Typography } from "antd";
import {
  BarsOutlined,
  FileDoneOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/Logo-StayOrganized.png";
import { useState } from "react";

export const AppLayout = (props: any) => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Sider
          style={{
            backgroundColor: ThemeColors.primaryColor,
            overflow: "auto",
            zIndex: 1,
            left: 0,
            top: 0,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            style={{
              display: "flex",
              left: "25px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
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
            selectable={true}
            theme="light"
            mode="inline"
            style={{
              width: "100%",
              top: "170px",

              backgroundColor: ThemeColors.primaryColor,
              color: "white",
            }}
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                style: { backgroundColor: ThemeColors.orangeColor },
                label: "dashboard",
                key: "/",
                icon: <HomeOutlined />,
              },
              {
                style: { backgroundColor: ThemeColors.orangeColor },
                label: "quotaion",
                key: "/quotation",
                icon: <FileDoneOutlined />,
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

          <Content style={{ backgroundColor: ThemeColors.bgColor }}>
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
