import React from 'react';
import { Layout, Menu, Image, Typography, Row, Col, Button, Flex } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logoutotechV2.png';
import sidebar from '../assets/images/abstract_sidebar.png';
import { Menus } from '.';
import {
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SidebarProps {
  setting: any;
}

export const Sidebar = (props: SidebarProps) => {
  const { setting } = props;
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [defaultOpenKeys, setDefaultOpenKeys] = React.useState([]);

  const currentPath = location.pathname;

  const handleMenuClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const getAllSubmenuKeys = (menus: any[]): string[] => {
    return menus.filter((menu) => menu.children).map((menu) => menu.key);
  };

  const me = JSON.parse(localStorage.getItem('me') || '{}');
  const menusWithOnClick = Menus({ role: me.role.name }).map((menu: any) => ({
    ...menu,
    onClick: handleMenuClick,
  }));

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    setCollapsed(isMobile);

    const allSubmenuKeys: any = getAllSubmenuKeys(menusWithOnClick);
    isMobile ? setDefaultOpenKeys([]) : setDefaultOpenKeys(allSubmenuKeys);
  }, [isMobile]);

  const handleNameWithType = (type: string) => {
    switch (type) {
      case 'Taxpayer':
        return setting?.organization?.nameTh;
      case 'OrdinaryPartnership':
        return `ห้างหุ้นส่วนสามัญ ${setting?.organization?.nameTh}`;
      case 'Shop':
        return `ร้านค้า ${setting?.organization?.nameTh}`;
      case 'BodyOfPerson':
        return `คณะบุคคล ${setting?.organization?.nameTh}`;
      case 'CompanyLimited':
        return `บริษัท ${setting?.organization?.nameTh} จำกัด`;
      case 'PublicCompanyLimited':
        return `บริษัท ${setting?.organization?.nameTh} จำกัด (มหาชน)`;
      case 'LimitedPartnership':
        return `ห้างหุ้นส่วน ${setting?.organization?.nameTh}`;
      case 'Foundation':
        return `มูลนิธิ ${setting?.organization?.nameTh}`;
      case 'Association':
        return `สมาคม ${setting?.organization?.nameTh}`;
      case 'JointVenture':
        return `กิจการร่วมค้า ${setting?.organization?.nameTh}`;
      case 'Others':
        return setting?.organization?.nameTh;

      default:
        return setting?.organization?.nameTh;
    }
  };

  return (
    <>
      <Sider
        width={isMobile && collapsed ? 0 : 200}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        onBreakpoint={(broken) => {
          setIsMobile(broken);
        }}
        style={{
          position: isMobile ? 'fixed' : 'relative',
          zIndex: 10,
          height: '100vh',
          transition: 'width 0.2s',
        }}
      >
        <Flex vertical justify="space-between" style={{ minHeight: '100vh' }}>
          <div>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${sidebar})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.1,
              }}
            />
            <Row
              justify="center"
              align="middle"
              style={{
                marginTop: '10px',
              }}
            >
              <Col>
                <Link
                  to={
                    location.pathname.includes('/admin')
                      ? '/admin/analytic'
                      : '/attendance'
                  }
                >
                  <Image
                    preview={false}
                    src={
                      setting?.organization?.logoUrl
                        ? setting.organization.logoUrl
                        : logo
                    }
                    width={collapsed ? 40 : 70}
                  />
                </Link>
              </Col>
            </Row>
            {!collapsed && (
              <Row
                justify="center"
                align="middle"
                gutter={[12, 12]}
                style={{
                  marginTop: '10px',
                  marginBottom: '-10px',
                }}
              >
                <Col>
                  <Flex vertical justify="center" align="center">
                    <Typography style={{ color: '#19142A', fontSize: '20px' }}>
                      {/* บริษัท ยูโทเทค จำกัด */}
                      {handleNameWithType(setting?.organization?.type)}
                    </Typography>
                    <Typography style={{ color: 'grey', fontSize: '16px' }}>
                      (สำนักงานใหญ่)
                      {/* {`(${setting?.organization?.branches[0]?.nameTh})`} */}
                    </Typography>
                  </Flex>
                </Col>
              </Row>
            )}
            <div style={{ marginTop: collapsed ? '40px' : '0px' }}>
              <Menu
                theme="light"
                mode="inline"
                openKeys={defaultOpenKeys}
                selectedKeys={[currentPath]}
                defaultOpenKeys={['/']}
                style={{
                  backgroundColor: '#F7F7F7',
                  marginTop: collapsed ? '0px' : '60px',
                  overflow: 'auto',
                }}
              >
                {menusWithOnClick.map((menu: any) =>
                  menu.divider ? (
                    <Menu.Divider key={menu.key} />
                  ) : menu.children ? (
                    <SubMenu
                      style={{
                        backgroundColor: '#F7F7F7',
                        overflow: 'auto',
                      }}
                      key={menu.key}
                      icon={menu.icon} // Use parent icon here
                      title={menu.label}
                    >
                      {menu.children.map((subMenu: any) => (
                        <Menu.Item
                          key={subMenu.key}
                          icon={subMenu.icon} // Use child icon here
                        >
                          {subMenu.label}
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item
                      key={menu.key}
                      icon={menu.icon} // Use parent icon for items without children
                      disabled={menu.disable}
                    >
                      {menu.label}
                    </Menu.Item>
                  ),
                )}
              </Menu>
            </div>
          </div>

          <div>
            <Button
              className="custom-sider-trigger"
              style={{ width: '100%', height: '40px' }}
              onClick={toggle}
            >
              {collapsed ? (
                <RightOutlined style={{ fontSize: '18px' }} />
              ) : (
                <LeftOutlined style={{ fontSize: '18px' }} />
              )}
            </Button>
          </div>
        </Flex>

        {/* 
        FIXME: Reopen me in soon ... 
        {!collapsed && (
          <Card
            style={{
              position: 'absolute',
              bottom: '50px',
              margin: '5px',
              background: '#F7F7F7',
              borderColor: '#F7F7F7',
              width: 'calc(100% - 10px)',
              borderRadius: '10px',
            }}
            bodyStyle={{ padding: '10px', textAlign: 'center' }}
          >
            <Typography style={{ fontWeight: 'bold', color: '#19142A' }}>
              บริษัท ยูโทเทค จำกัด
            </Typography>
            <Typography style={{ color: '#19142A', opacity: 0.6 }}>
              STAY ORGANIZED
            </Typography>

       
            <Button
              type="primary"
              block
              style={{
                marginTop: '10px',
                backgroundColor: '#19142A',
                borderColor: '#19142A',
                borderRadius: '5px',
              }}
              className="upgrade-button"
            >
              <Link to="/upgrade"> Upgrade </Link>
            </Button>
          </Card>
        )} */}
      </Sider>
      {isMobile && collapsed === false && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(25, 20, 42, 0.8)', // RGBA color for transparency
            zIndex: 9,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
      {isMobile === true && (
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            zIndex: 1,
            margin: '20px 10px',
            position: 'fixed',
            fontSize: '24px',
            top: 20,
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
