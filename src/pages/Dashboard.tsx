import { Card } from "antd";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <div>
      <Card
        title="testing"
        extra={<Link to="/dashboard">เพิ่มเติม</Link>}
      ></Card>
    </div>
  );
};
