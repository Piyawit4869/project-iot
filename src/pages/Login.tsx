import { Form, Input, Button, notification, Typography, Card } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
// import React from "react";

import * as API from '@src/apis';
import { json, redirect, useNavigation, useSubmit } from 'react-router-dom';

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
          message: 'Login Success',
          placement: 'bottomRight',
          description: 'You have successfully logged in',
        });

        return redirect(
          data.user === 'super.admin@utotech.org'
            ? '/admin/analytic'
            : '/attendance/action',
        );
      } catch (error) {
        notification.error({
          message: 'Login Failed',
          placement: 'bottomRight',
          description: 'Invalid email or password',
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
      }}
    >
      <Card
        style={{
          margin: '1rem',
          width: '100%',
          maxWidth: '515px',
          // backgroundColor: 'white',
          borderColor: 'transparent',
          backgroundColor: 'rgb(25, 20, 42)',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <Form
          form={form}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="middle"
        >
          <Typography.Title level={1} style={{ color: 'white' }}>
            ROME
          </Typography.Title>
          <div style={{ height: '30px' }} />
          <Form.Item
            name="user"
            rules={[
              {
                required: true,
                message: 'Please input your Email or Username',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email or Username"
              style={{ fontSize: '16px' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ fontSize: '16px' }}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
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
                fontSize: '18px',
                padding: '0 30px',
                width: '100%',
                backgroundColor: '#A79DB4',
                borderColor: 'transparent',
                color: 'white',
              }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
