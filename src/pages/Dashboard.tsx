import { Card } from "antd";
import { Link } from "react-router-dom";
import { ThemeColors } from "../styles/theme";

export const DashboardPage = () => {
  return (
    <div>
      <Card
        style={{ backgroundColor: ThemeColors.lightOrangeColor }}
        extra={<Link to="/dashboard">เพิ่มเติม</Link>}
      ></Card>
    </div>
  );
};
