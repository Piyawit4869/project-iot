import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

interface MenusProps {
  role: string;
}

export const Menus = (props: MenusProps) => {
  const { role } = props;
  const menus = [
    {
      label: <Link to="/organize">องค์กร</Link>,
      key: "organize",
      icon: <Icon.ScheduleOutlined />,
      role: ["super_admin"],
    },
    {
      label: <Link to="/analytic">วิเคราะห์</Link>,
      key: "analytic",
      icon: <Icon.PieChartOutlined />,
      role: ["super_admin", "owner", "manager"],
    },
    {
      label: <Link to="/branch">สาขา</Link>,
      key: "branch",
      icon: <Icon.BranchesOutlined />,
      role: ["owner"],
    },

    {
      label: <Link to="/attendance">เข้างานออกงาน</Link>,
      key: "attendance",
      icon: <Icon.FieldTimeOutlined />,
      role: ["owner", "manager", "employee"],
    },
    {
      label: <Link to="/user">ผู้ใช้</Link>,
      key: "user",
      icon: <Icon.UserOutlined />,
      role: ["super_admin", "owner", "manager"],
    },
    {
      label: <Link to="/notation">เอกสาร</Link>,
      key: "notation",
      icon: <Icon.ReconciliationOutlined />,
      role: ["owner", "manager"],
    },
    {
      label: <Link to="/customer">ลูกค้า</Link>,
      key: "customers",
      icon: <Icon.CustomerServiceOutlined />,
      role: ["owner", "manager"],
    },
    {
      label: <Link to="/project">โครงการ</Link>,
      key: "project",
      icon: <Icon.ProjectOutlined />,
      role: ["owner", "manager"],
    },
    // {
    //   label: <Link to="/setting">ตั้งค่า</Link>,
    //   key: "setting",
    //   icon: <Icon.SettingOutlined />,
    //   role: ["branch_admin","organize_admin"],
    // },
    {
      label: <Link to="/information">ข้อมูลสาขา</Link>,
      key: "information",
      icon: <Icon.SettingOutlined />,
      role: ["manager"],
    },
    {
      label: <Link to="/orginformation">ข้อมูลองค์กร</Link>,
      key: "orginformation",
      icon: <Icon.SettingOutlined />,
      role: ["owner"],
    },
  ];
  return menus.filter((m) => m.role.includes(role));
};
