import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

interface MenusProps {
  role: string;
}

export const Menus = (props: MenusProps) => {
  const { role } = props;
  const menus = [
    {
      label:"My Organize",
      key: "organize",
      icon: <Icon.DatabaseOutlined rotate={90} style={{ color: "#28104878" }} />,
      role: ["organize_admin"],
      children: [
        {
          label: <Link to="/organize">Organize</Link>,
          key: "organize",
          icon: <Icon.ScheduleOutlined />,
          role: ["organize_admin",  ],
        },
        {
          label: <Link to="/branch">Branch</Link>,
          key: "branch",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["organize_admin", ],
        },
        {
          label: <Link to="/customers">Customers</Link>,
          key: "customers",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["organize_admin", "user" ],
        },
        {
          label: <Link to="/user">User</Link>,
          key: "user",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["organize_admin", "user"],
        },
      ],
    },

    {
      label: "Organize",
      key: "organize",
      icon: <Icon.DatabaseOutlined rotate={90} style={{ color: "#28104878" }} />,
      role: ["super_admin"],
      children: [
        {
          label: <Link to="/organize">Organize</Link>,
          key: "organize",
          icon: <Icon.ScheduleOutlined />,
          role: [ "user", "super_admin"],
        },
        {
          label: <Link to="/branch">Branch</Link>,
          key: "branch",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: [ "super_admin"],
        },
        {
          label: <Link to="/customers">Customers</Link>,
          key: "customers",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: [ "super_admin"],
        },
        {
          label: <Link to="/user">User</Link>,
          key: "user",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: [  "super_admin"],
        },
      ],
    },
    {
      label:"Attendance",
      key: "attendance",
      icon: <Icon.DatabaseOutlined rotate={90} style={{ color: "#28104878" }} />,
      role: ["organize_admin", "user", "super_admin"],
      children: [
        {
          label: <Link to="/work information">Work information</Link>,
          key: "work information",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["organize_admin", "super_admin"],
        },
        {
          label: <Link to="/attendance ">Attendance </Link>,
          key: "attendance ",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["user","organize_admin", "super_admin"],
        },
        {
          label: <Link to="/approval">Approval</Link>,
          key: "approval",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["organize_admin", "user", "super_admin"],
        },
        {
          label: <Link to="/timesheets">Timesheets</Link>,
          key: "timesheets",
          icon: <Icon.DatabaseOutlined rotate={90} />,
          role: ["organize_admin", "user", "super_admin"],
        },
      ],
    },
    {
      key: "divider1",
      role: ["organize_admin", "user", "super_admin"],
      divider: true,
    },
    {
      label: <Link to="/notation">Notation</Link>,
      key: "notation",
      icon: <Icon.ReconciliationOutlined />,
      role: ["organize_admin", "user", "super_admin"],
    },
    {
      label: <Link to="/project">Project</Link>,
      key: "project",
      icon: <Icon.DatabaseOutlined rotate={90} />,
      role: ["organize_admin", "user", "super_admin"],
    },
  ];

  return menus.filter((m) => m.role.includes(role));
};
