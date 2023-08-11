import { Button, Image, Layout, Menu, Row, Typography } from "antd";
import {
  BarsOutlined,
  FileDoneOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { ThemeColors } from "../styles/theme";
import Logo from "../assets/images/Logo-StayOrganized.png";

export const AppLayout = (props: any) => {
  const { Sider } = Layout;

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Sider
          style={{
            backgroundColor: ThemeColors.primaryColor,
          }}
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div
            style={{
              display: "flex",
              left: "25px",
              position: "fixed",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Image width={100} src={Logo} preview={false} />
            <Typography style={{ fontSize: "24px", color: "white" }}>
              Stay-Organize
            </Typography>
          </div>

          <Menu
            selectable={true}
            theme="light"
            mode="inline"
            style={{
              width: "200px",
              top: "170px",
              position: "fixed",
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
              icon={<BarsOutlined />}
              size={"middle"}
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
