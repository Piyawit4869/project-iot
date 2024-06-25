import { Space } from "antd";
import { Link } from "react-router-dom";

export const AppLandingPage = () => {
  return (
    <Space direction="vertical">
      Please select Feature
      <Space size="large">
        <Link to="/attendance">Attendance</Link>
        <Link to="/notation">Notation</Link>
        <Link to="/planning">Planning</Link>
        <Link to="/customers">Customers</Link>
      </Space>
    </Space>
  );
};
