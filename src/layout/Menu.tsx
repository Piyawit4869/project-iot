import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

interface MenusProps {
  role: string;
  action?: () => void;
}

interface MenuItem {
  label?: JSX.Element;
  key: string;
  icon?: JSX.Element;
  role: string[];
  divider?: boolean;
}

export const Menus = (props: MenusProps) => {
  const { role } = props;

  const menus: MenuItem[] = [
    {
      label: <Link to="/admin/organize">Organize</Link>,
      key: "organize",
      icon: <Icon.DatabaseOutlined rotate={90} />,
      role: ["super_admin"],
    },
    {
      label: <Link to="/attendance">Attendance</Link>,
      key: "attendance",
      icon: <Icon.ScheduleOutlined />,
      role: ["admin", "user", "super_admin"],
    },
    {
      key: "divider1",
      role: ["admin", "user", "super_admin"],
      divider: true,
    },
    {
      label: <Link to="/notation">Notation</Link>,
      key: "notation",
      icon: <Icon.ReconciliationOutlined />,
      role: ["admin", "user", "super_admin"],
    },
    {
      label: <Link to="/planning">Planning</Link>,
      key: "planning",
      icon: <Icon.DatabaseOutlined rotate={90} />,
      role: ["admin", "user", "super_admin"],
    },
    {
      label: <Link to="/customers">Customers</Link>,
      key: "customers",
      icon: <Icon.DatabaseOutlined rotate={90} />,
      role: ["admin", "super_admin"],
    },
  ];

  return menus.filter((menu: any) => menu.role.includes(role) > -1);
};
