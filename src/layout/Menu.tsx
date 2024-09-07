import { Link } from 'react-router-dom';
import * as Icon from '@ant-design/icons';

interface MenusProps {
  role: string;
}

export const Menus = (props: MenusProps) => {
  const { role } = props;
  const menus = [
    {
      //<Link to="/admin/analytic" >วิเคราะห์ระบบ</Link>
      label: <Link to="/admin/analytic">วิเคราะห์ระบบ</Link>,
      key: '/admin/analytic',
      icon: <Icon.PieChartOutlined />,
      role: ['super_admin'],
      // disable: true,
    },
    {
      label: <Link to="/admin/organize">องค์กร</Link>,
      key: '/admin/organize',
      icon: <Icon.ScheduleOutlined />,
      role: ['super_admin'],
    },
    {
      //<Link to="/admin/employee">พนักงาน</Link>,
      label: <Link to="/admin/employee">พนักงาน</Link>,
      key: '/admin/employee',
      icon: <Icon.UserOutlined />,
      role: ['super_admin'],
      // disable: true,
    },
    {
      label: <Link to="/analytic">วิเคราะห์</Link>,
      key: '/analytic',
      icon: <Icon.PieChartOutlined />,
      role: ['owner', 'manager'],
    },
    {
      label: <Link to="/branch">สาขา</Link>,
      key: '/branch',
      icon: <Icon.BranchesOutlined />,
      role: ['owner'],
    },

    {
      label: <p style={{color:'grey'}}>เข้างานออกงาน</p>,
      icon: <Icon.FieldTimeOutlined  />,
      role: ['owner', 'manager', 'supervisor', 'employee'],
      key: '/attendance',

       children: [
          {
            label: <Link to="/attendance">ภาพรวม</Link>,
            icon: <Icon.BarsOutlined  />,
            role: ['owner', 'manager', 'supervisor', 'employee'],
            key: '/attendance',
          },
          {
            label: <Link to="/attendance/attendance-overview">ข้อมูลเชิงลึก</Link>,
            icon: <Icon.DashboardOutlined  />,
            role: ['owner', 'manager', 'supervisor', 'employee'],
            key: '/attendance/attendance-overview',
          },
         
        ],
    },
    {
      label: <Link to="/user">ผู้ใช้</Link>,
      key: '/user',
      icon: <Icon.UserOutlined />,
      role: ['owner', 'manager'],
    },
    {
      //<Link to="/notation">
      label: (
        <Link to="#" style={{ cursor: 'not-allowed' }}>
          เอกสาร
        </Link>
      ),
      key: '/notation',
      icon: <Icon.ReconciliationOutlined />,
      role: ['owner', 'manager'],
      disable: true,
    },
    {
      //  <Link to="/customer">
      label: (
        <Link to="#" style={{ cursor: 'not-allowed' }}>
          ลูกค้า
        </Link>
      ),
      key: '/customer',
      icon: <Icon.CustomerServiceOutlined />,
      role: ['owner', 'manager'],
      disable: true,
    },
    {
      //<Link to="/project">
      label: (
        <Link to="#" style={{ cursor: 'not-allowed' }}>
          โครงการ
        </Link>
      ),
      key: '/project',
      icon: <Icon.ProjectOutlined />,
      role: ['owner', 'manager'],
      disable: true,
    },
    // {
    //   label: <Link to="/setting">ตั้งค่า</Link>,
    //   key: "setting",
    //   icon: <Icon.SettingOutlined />,
    //   role: ["branch_admin","organize_admin"],
    // },
    {
      //<Link to="/information-branch">
      label: (
        <Link to="#" style={{ cursor: 'not-allowed' }}>
          ข้อมูลสาขา
        </Link>
      ),
      key: '/information-branch',
      icon: <Icon.SettingOutlined />,
      role: ['manager'],
      disable: true,
    },
    {
      // <Link to="/information">
      label: (
        <Link to="#" style={{ cursor: 'not-allowed' }}>
          ข้อมูลองค์กร
        </Link>
      ),
      key: '/information',
      icon: <Icon.SettingOutlined />,
      role: ['owner'],
      disable: true,
    },
  ];
  return menus.filter((m) => m.role.includes(role));
};
