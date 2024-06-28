import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

interface MenusProps {
  role: string;
}

export const Menus = (props: MenusProps) => {
  const { role } = props;
  const menus = [
    // {
    //   label: <Link to="/organize">จัดระเบียบ</Link>,
    //   key: "organize",
    //   icon: <Icon.ScheduleOutlined />,
    //   role: ["super_admin"],
    // },
    // {
    //   label: <Link to="/analytic">วิเคราะห์</Link>,
    //   key: "analytic",
    //   icon: <Icon.DatabaseOutlined rotate={90} />,
    //   role: ["super_admin","organize_admin","branch_admin"],
    // },
    // {
    //   label: <Link to="/user">ผู้ใช้</Link>,
    //   key: "user",
    //   icon: <Icon.DatabaseOutlined rotate={90} />,
    //   role: ["super_admin","organize_admin","branch_admin"],
    // },
    // {
    //   label: <Link to="/dashboard">หน้ารวม</Link>,
    //   key: "dashboard",
    //   icon: <Icon.DashboardOutlined rotate={90} />,
    //   role: ["organize_admin","branch_admin"],
    // },
    // {
    //   label: <Link to="/branch">สาขา</Link>,
    //   key: "branch",
    //   icon: <Icon.BranchesOutlined rotate={90} />,
    //   role: ["organize_admin"],
    // },
    // {
    //   label: <Link to="/customers">ลูกค้า</Link>,
    //   key: "customers",
    //   icon: <Icon.DatabaseOutlined rotate={90} />,
    //   role: ["organize_admin"],
    // },
    // {
    //   label: <Link to="/attendance ">เข้างานออกงาน</Link>,
    //   key: "attendance ",
    //   icon: <Icon.DatabaseOutlined rotate={90} />,
    //   role: ["organize_admin"],
    // },
    // {
    //   label: <Link to="/notation">เอกสาร</Link>,
    //   key: "notation",
    //   icon: <Icon.ReconciliationOutlined />,
    //   role: ["organize_admin"],
    // },
    // {
    //   label: <Link to="/upgrade">อัปเกรด</Link>,
    //   key: "upgrade",
    //   icon: <Icon.DatabaseOutlined rotate={90} />,
    //   role: ["organize_admin"],
    // },
    // {
    //   label: <Link to="/setting">ตั้งค่า</Link>,
    //   key: "setting",
    //   icon: <Icon.DatabaseOutlined rotate={90} />,
    //   role: ["organize_admin"],
    // },

    // // branch_admin
    // {
    //   label: <Link to="/dashboard">หน้ารวม</Link>,
    //   key: "dashboard",
    //   icon: <Icon.DashboardOutlined />,
    //   role: ["organize_admin","branch_admin"],
    // },

    {
      label: <Link to="/organize">องค์กร</Link>,
      key: "organize",
      icon: <Icon.ScheduleOutlined />,
      role: ["super_admin"],
    },
    {
      label: <Link to="/branch">สาขา</Link>,
      key: "branch",
      icon: <Icon.BranchesOutlined />,
      role: ["organize_admin"],
    },
    {
      label: <Link to="/analytic">วิเคราะห์</Link>,
      key: "analytic",
      icon: <Icon.PieChartOutlined />,
      role: ["super_admin", "organize_admin", "branch_admin"],
    },
    {
      label: <Link to="/attendance">เข้างานออกงาน</Link>,
      key: "attendance",
      icon: <Icon.FieldTimeOutlined />,
      role: ["super_admin", "organize_admin", "branch_admin", "user"],
    },
    {
      label: <Link to="/user">ผู้ใช้</Link>,
      key: "user",
      icon: <Icon.UserOutlined />,
      role: ["super_admin", "organize_admin", "branch_admin"],
    },
    {
      label: <Link to="/notation">เอกสาร</Link>,
      key: "notation",
      icon: <Icon.ReconciliationOutlined />,
      role: ["super_admin", "organize_admin", "branch_admin"],
    },
    {
      label: <Link to="/customers">ลูกค้า</Link>,
      key: "customers",
      icon: <Icon.CustomerServiceOutlined />,
      role: ["organize_admin", "branch_admin"],
    },
    {
      label: <Link to="/project">โครงการ</Link>,
      key: "project",
      icon: <Icon.ProjectOutlined />,
      role: ["super_admin", "organize_admin", "branch_admin"],
    },
    {
      label: <Link to="/information">ตั้งค่า</Link>,
      key: "information",
      icon: <Icon.SettingOutlined />,
      role: ["super_admin", "organize_admin", "branch_admin"],
    },
  ];
  return menus.filter((m) => m.role.includes(role));
};
