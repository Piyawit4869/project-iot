import React from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  Empty,
  Flex,
  Image,
  Menu,
  MenuProps,
  Row,
  Space,
  notification,
} from 'antd';
import { useTranslation } from 'react-i18next';
import Pusher from 'pusher-js';
import * as API from '@src/apis';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { json, redirect } from 'react-router-dom';

const pusherKey = import.meta.env.VITE_APP_PUSHER_APP_KEY;

const clientId =
  '23189663829-jbftuq5rc78ct17qkjd48f97lcmd28h0.apps.googleusercontent.com';

const clientSecret = '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';

async function loginWithGoogleAction(data: any) {
  try {
    const res = await API.auth.loginWithGoogle(data);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    notification.success({
      message: 'Login Success',
      placement: 'bottomRight',
      description: 'You have successfully logged in',
    });
    return redirect(
      data.user === 'super.admin@utotech.org' ? '/admin/analytic' : '/analytic',
    );
  } catch (error) {
    notification.error({
      message: 'Login Failed',
      placement: 'bottomRight',
      description: 'Invalid email or password',
    });

    return json({ status: 'error', message: 'Invalid email or password' });
  }
}

export const Headerbar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [notificationsCount, setNotificationsCount] = React.useState(0);
  const me = JSON.parse(localStorage.getItem('me') as any);

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const tokensResponse = await axios.post(
          'https://oauth2.googleapis.com/token',
          {
            code: codeResponse.code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'http://localhost:8080',
            grant_type: 'authorization_code',
          },
        );

        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokensResponse.data.access_token}`,
            },
          },
        );

        const response = {
          accessToken: tokensResponse.data.access_token,
          refreshToken: tokensResponse.data.refresh_token,
          type: 'web',
          provider: 'google',
          details: {
            idToken: tokensResponse.data.id_token,
            scopes: codeResponse.scope?.split(' ') || [],
            serverAuthCode: codeResponse.code,
            user: {
              email: userInfoResponse.data.email,
              familyName: userInfoResponse.data.family_name,
              givenName: userInfoResponse.data.given_name,
              id: userInfoResponse.data.sub,
              name: userInfoResponse.data.name,
              photo: userInfoResponse.data.picture,
            },
          },
        };

        await loginWithGoogleAction(response);
      } catch (error) {
        console.error('Error during login process:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Login Failed:', errorResponse);
    },
  });

  const defaultNotifications: MenuProps['items'] = [
    {
      label: (
        <Link to={'#'}>
          <Flex align="center" justify="end">
            ดูทั้งหมด
          </Flex>
        </Link>
      ),
      key: 'see-more',
    },
    {
      label: <Empty description={'ไม่มีการแจ้งเตือนในขนาดนี้'} />,
      key: 'empty',
    },
  ];

  const [notifications, setNotifications] =
    React.useState(defaultNotifications);

  const items: MenuProps['items'] = [
    {
      label: (
        <>
          <Flex gap="12px" align="center">
            <Image
              src={
                me?.profile?.photoUrl
                  ? me.profile.photoUrl
                  : `https://api.dicebear.com/7.x/miniavs/svg?seed=${me.id}`
              }
              alt="User Icon"
              width={80}
              preview={false}
              style={{ fontSize: '24px' }}
            />
            <Flex vertical>
              <div style={styles.email}>
                {me?.profile?.firstName + ' ' + me?.profile?.lastName}
              </div>
              <div style={styles.email}>{me?.email}</div>
              <div style={styles.role}>{t(`${me?.role?.name}`)}</div>
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
    {
      label: (
        <Button
          onClick={() => login()}
          size="large"
          type="primary"
          htmlType="submit"
          icon={<GoogleOutlined />}
          style={{ width: '100%' }}
          // loading={
          //   navigation.state === 'loading' || navigation.state === 'submitting'
          // }
          // disabled={
          //   navigation.state === 'loading' || navigation.state === 'submitting'
          // }
        >
          Login with Google
        </Button>
      ),
      key: '3',
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
                : '/attendance'
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

  React.useEffect(() => {
    const pusher = new Pusher(pusherKey, {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('notifications');

    channel.bind('notifications', (data: any) => {
      setNotificationsCount((prevCount) => prevCount + 1);
      // notifications.push({
      //   label: (
      //     <Link to={`/admin/notification/${data.id}`}>
      //       <Flex gap={12} align="center">
      //         <Avatar icon={<Icon.UserOutlined />} />
      //         <Card.Meta title={data.title} description={data.description} />
      //       </Flex>
      //     </Link>
      //   ),
      //   key: `notification-${data.id}`,
      // });

      setNotifications((prev: any) => [
        {
          label: (
            <Link to={`/admin/notification/${data.id}`}>
              <Flex gap={12} align="center">
                <Avatar icon={<UserOutlined />} />
                <Card.Meta title={data.title} description={data.description} />
              </Flex>
            </Link>
          ),
          key: `notification-${data.id}`,
        },
        ...prev,
      ]);
    });

    return () => {
      pusher.unsubscribe('test-channel');
    };
  }, [notifications]);

  return (
    <div style={styles.header}>
      {generateBreadcrumbs(location.pathname)}
      <Row gutter={[12, 12]} align="middle">
        <Col>
          <div style={styles.menu}>
            <Flex>
              <Dropdown
                overlay={<Menu items={defaultNotifications} />}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Badge
                      count={notificationsCount ? notificationsCount : 0}
                      size="small"
                    >
                      <BellOutlined
                        style={{ ...styles.icon, fontSize: '18px' }}
                      />
                    </Badge>
                  </Space>
                </a>
              </Dropdown>
              <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Image
                      src={
                        me?.profile?.photoUrl
                          ? me.profile.photoUrl
                          : `https://api.dicebear.com/7.x/miniavs/svg?seed=${me.id}`
                      }
                      alt="User Icon"
                      preview={false}
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
