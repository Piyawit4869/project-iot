import { Card, Layout } from "antd";
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
      
      <Card style={{ backgroundColor: "white" }}>
        <Outlet />
      </Card>
    </Content>
  );
};
