import { Layout, Menu } from "antd";
import { FileAddOutlined, DashboardOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";

export const AppLayout = (props: any) => {
  const { Sider } = Layout;

  const navigate = useNavigate();

  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Sider
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
          <div style={{marginLeft:"12px"}}>
            <h1>Stay-Organize</h1>
          </div>

          <Menu
            theme="light"
            mode="inline"
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                label: "dashboard",
                key: "/",
                icon: <DashboardOutlined />,
              },
              {
                label: "setting",
                key: "/settings",
                icon: <FileAddOutlined />,
              },
              {
                label: "quotaion",
                key: "/quotation",
              }
            ]}
          ></Menu>
        </Sider>
        <Header
          style={{
            padding: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
          }}
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
      {/* FIXME: create new footer */}
    </>
  );
};
