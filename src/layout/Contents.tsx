import { Breadcrumb, Card, Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";

interface ContentProps {
  loading: boolean;
}

export const Contents = (props: ContentProps) => {
  const { Content } = Layout;
  const { loading } = props;
  return (
    <Content
      className="app-background"
      style={{
        overflow: "auto",
        padding: "20px",
      }}
    >
      <Breadcrumb
        style={{ margin: "0px 0px 20px 40px" }}
        separator=""
        items={[
          {
            title: "Location",
          },
          {
            type: "separator",
            separator: ":",
          },
          {
            href: "",
            title: "Application Center",
          },
          {
            type: "separator",
          },
          {
            href: "",
            title: "Application List",
          },
          {
            type: "separator",
          },
          {
            title: "An Application",
          },
        ]}
      />
      <Card style={{ backgroundColor: "white" }}>
        <Spin
          spinning={loading}
          style={{
            height: "100%",
          }}
        >
          {loading ? (
            <div
              style={{
                height: "50vh",
              }}
            />
          ) : (
            <Outlet />
          )}
        </Spin>
      </Card>
    </Content>
  );
};
