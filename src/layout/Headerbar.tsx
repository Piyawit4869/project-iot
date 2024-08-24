import React from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  Col,
  Dropdown,
  Empty,
  Flex,
  Image,
  Menu,
  MenuProps,
  Row,
  Space,
} from 'antd';
import { useTranslation } from 'react-i18next';

export const Headerbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const me = JSON.parse(localStorage.getItem('me') as any);

  const notifications: MenuProps['items'] = [
    {
      label: <Empty description={'ไม่มีการแจ้งเตือนในขนาดนี้'} />,
      key: 'empty',
    },
  ];
  const items: MenuProps['items'] = [
    {
      label: (
        <>
          <Flex gap="12px" align="center">
            <Image
              src={
                me?.profile?.photoUrl
                  ? me.profile.photoUrl
                  : 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
              }
              alt="User Icon"
              preview={false}
              style={{ fontSize: '24px' }}
            />
            <Flex vertical>
              <div style={styles.email}>
                {me.profile.firstName + ' ' + me.profile.lastName}
              </div>
              <div style={styles.email}>{me.email}</div>
              <div style={styles.role}>{t(`${me.role.name}`)}</div>
            </Flex>
          </Flex>
        </>
      ),
      key: 'user',
    },
    {
      label: (
        <Link to="/profile">
          <UserOutlined /> {t('profile')}
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link to="/setting">
          <SettingOutlined /> {t('setting')}
        </Link>
      ),
      key: '1',
    },

    {
      label: (
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }}
        >
          <LogoutOutlined /> {t('logout')}
        </Link>
      ),
      key: '2',
    },
  ];

  const generateBreadcrumbs = (path: string) => {
    const pathnames = path.split('/').filter((x) => x);
    const modifiedPathnames =
      pathnames[0] === 'admin' ? pathnames.slice(1) : pathnames;

    return (
      <Breadcrumb style={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link
            to={
              location.pathname.includes('/admin')
                ? '/admin/analytic'
                : '/analytic'
            }
          >
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        {modifiedPathnames.map((name, index) => {
          const routeTo = `/${modifiedPathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === modifiedPathnames.length - 1;
          return (
            <Breadcrumb.Item key={name}>
              {isLast ? (
                t(name)
              ) : (
                <Link
                  to={
                    location.pathname.includes('/admin')
                      ? `/admin${routeTo}`
                      : routeTo
                  }
                >
                  {t(name)}
                </Link>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };
  return (
    <div style={styles.header}>
      {generateBreadcrumbs(location.pathname)}
      <Row gutter={[12, 12]} align="middle">
        <Col>
          <div style={styles.menu}>
            <Flex>
              <Dropdown
                overlay={<Menu items={notifications} />}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <BellOutlined
                      style={{ ...styles.icon, fontSize: '18px' }}
                    />
                  </Space>
                </a>
              </Dropdown>
              <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <img
                      src={
                        me?.profile?.photoUrl
                          ? me.profile.photoUrl
                          : 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
                      }
                      alt="User Icon"
                      style={styles.icon}
                    />
                  </Space>
                </a>
              </Dropdown>
            </Flex>
          </div>
        </Col>
      </Row>
    </div>
  );
};
const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    height: '50px',
    color: '#19142A',
  },
  menu: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 0px',
    height: '50px',
    color: '#19142A',
  },

  dropdown: {
    position: 'relative',
    display: 'inline-block',
    color: '#19142A',
  },
  dropdownToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    color: '#19142A',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '8px',
    textAlign: 'right',
    color: '#19142A',
  },
  email: {
    marginBottom: '4px',
    color: '#19142A',
  },
  role: {
    width: '100%',
    color: '#AAA7AD',
  },
  icon: {
    marginLeft: '8px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '100%',
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    zIndex: 1,
    borderRadius: '4px',
    marginTop: '5px',
  },
  dropdownItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    color: '#19142A',
  },
  breadcrumb: {
    margin: '16px 0',
    color: '#19142A',
  },
};
