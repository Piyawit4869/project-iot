import { Form, Input, Button, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
// import React from "react";

import * as API from "@src/apis";
import { json, redirect, useSubmit } from "react-router-dom";
// import axios from "axios";

//here Action example
export async function loginAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  // console.log({submitData});
  switch (submitData.action) {
    case "adminLogin":
      try {
        const res = await API.auth.adminLogin(JSON.parse(submitData.data));
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        notification.success({
          message: "Login Success",
          description: "You have successfully logged in",
        });

        return redirect("/");
      } catch (error) {
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password",
        });

        return json({ status: "error", message: "Invalid email or password" });
      }

    default:
      break;
  }
}

export const Login = () => {
  const submit = useSubmit();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const payload = { ...values };
    console.log({ payload });
    submit(
      { action: "adminLogin", data: JSON.stringify(payload) },
      { method: "post" }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: "500px" }}
      >
        <h1 style={{ textAlign: "left", fontSize: "50px" }}>Sign in</h1>
        <p style={{ textAlign: "left", fontSize: "25px", marginTop: "-40px" }}>
          Stay Organize Login
        </p>
        <Form.Item
          name="user"
          rules={[
            { required: true, message: "Please input your Email or Username" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email or Username"
            style={{ width: "500px", height: "50px", fontSize: "16px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            style={{ width: "500px", height: "50px", fontSize: "16px" }}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              height: "50px",
              fontSize: "18px",
              padding: "0 30px",
              width: "100%",
            }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
