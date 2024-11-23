import {
  Form,
  Input,
  Button,
  notification,
  Typography,
  Card,
  Flex,
  Col,
  Image,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
// import React from "react";

import * as API from '@src/apis';
import {
  json,
  Link,
  redirect,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import Rome from '@src/assets/images/rome.jpg';

//here Action example
export async function loginAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  console.log({ submitData });
  const data = JSON.parse(submitData.data);
  switch (submitData.action) {
    case 'adminLogin':
      try {
        const res = await API.auth.adminLogin(JSON.parse(submitData.data));
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        notification.success({
          message: 'เข้าสู่ระบบสำเร็จ',
          placement: 'bottomRight',
          description: 'คุณเข้าสู่ระบบสำเร็จแล้ว',
          duration: 3,
        });

        return redirect(
          data.user === 'super.admin@utotech.org'
            ? '/admin/analytic'
            : '/attendance/action',
        );
      } catch (error) {
        notification.error({
          message: 'เข้าสู่ระบบล้มเหลว',
          placement: 'bottomRight',
          description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
          duration: 3,
        });
        return json({ status: 'error', message: 'Invalid email or password' });
      }

    default:
      break;
  }
}

export const Login = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const payload = { ...values };
    console.log({ payload });
    submit(
      { action: 'adminLogin', data: JSON.stringify(payload) },
      { method: 'post' },
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background:
          'linear-gradient(90deg, rgba(28, 181, 224, 0.5), rgba(0, 0, 70, 1))',
      }}
    >
      <Card
        bodyStyle={{ padding: '0' }}
        style={{
          borderRadius: '10px',
          width: '100%',
          maxWidth: '1360px',
          minWidth: '300px',
          background: 'white',
          height: '76vh',
          margin: '20px',
          boxShadow: '12px 12px 12px 12px rgba(0, 0, 70, 0.5)',
        }}
      >
        <Flex>
          <Col xs={0} sm={0} md={12} lg={13} xl={13}>
            <Image
              src={Rome}
              style={{
                borderRadius: '10px',
                height: '75vh',
                borderColor: 'transparent',
              }}
              preview={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={11} xl={11}>
            <Flex
              vertical
              justify="center"
              align="center"
              style={{ height: '70vh' }}
            >
              <Form
                form={form}
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
                style={{ padding: '2rem' }}
              >
                <Typography.Title
                  level={1}
                  style={{ fontSize: 'calc(2rem + 1vw)' }}
                >
                  ROME
                </Typography.Title>
                <Typography.Paragraph
                  style={{
                    fontSize: 'calc(0.8rem + 0.5vw)',
                    marginBottom: '3rem',
                  }}
                >
                  "If you haven't figured out how to build Rome in a day, let us
                  show you how with the ROME platform."
                </Typography.Paragraph>
                <Form.Item
                  name="user"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email or Username',
                    },
                  ]}
                  style={{ boxShadow: ' 0px 8px 12px rgba(0, 0, 70, 0.5)' }}
                >
                  <Input
                    className="no-autofill"
                    prefix={<UserOutlined />}
                    placeholder="Email or Username"
                    size="large"
                    style={{ borderRadius: 0, height: 60, fontSize: 18 }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your Password!' },
                  ]}
                  style={{ boxShadow: ' 0px 8px 12px rgba(0, 0, 70, 0.5)' }}
                >
                  <Input.Password
                    className="no-autofill"
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    style={{ borderRadius: 0, height: 60, fontSize: 18 }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={
                      navigation.state === 'loading' ||
                      navigation.state === 'submitting'
                    }
                    disabled={
                      navigation.state === 'loading' ||
                      navigation.state === 'submitting'
                    }
                    style={{
                      fontSize: 18,
                      borderRadius: 0,
                      height: 60,
                      padding: '0 30px',
                      width: '100%',
                      borderColor: 'transparent',
                      color: 'white',
                      boxShadow: ' 0px 8px 12px rgba(0, 0, 70, 0.5)',
                    }}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ height: '30px' }} />
              <Flex gap={6}>
                <Typography>Do you have organization like Rome? | </Typography>
                <Link to={'https://utotech.co.th/'} target="_blank">
                  <Typography.Link style={{ color: '#2db7f5' }}>
                    Contact us
                  </Typography.Link>
                </Link>
              </Flex>
            </Flex>
          </Col>
        </Flex>
      </Card>
    </div>
  );
};
