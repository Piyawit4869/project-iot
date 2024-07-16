import { Breadcrumb, Card, Layout } from "antd";
import { Outlet } from "react-router-dom";

export const Contents = () => {
  const { Content } = Layout;
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
            title: "",
          },
          {
            type: "separator",
            separator: "",
          },
          {
            href: "",
            title: "",
          },
          
          {
            href: "",
            title: "",
          },
          
          {
            title: "",
          },
        ]}
      />
      <Card style={{ backgroundColor: "white" }}>
        <Outlet />
      </Card>
    </Content>
  );
};
