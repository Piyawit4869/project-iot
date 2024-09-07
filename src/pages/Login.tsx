import { Form, Input, Button, notification, Typography, Card } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
// import React from "react";

import * as API from '@src/apis';
import { json, redirect, useNavigation, useSubmit } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId =
  '23189663829-jbftuq5rc78ct17qkjd48f97lcmd28h0.apps.googleusercontent.com';

const clientSecret = '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';

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
            : '/analytic',
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
            <Button
              onClick={() => login()}
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
              icon={<GoogleOutlined />}
              style={{
                fontSize: '18px',
                padding: '0 30px',
                width: '100%',
                borderColor: '#A79DB4',
                color: 'white',
                marginTop: '20px',
              }}
            >
              Login with Google
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
