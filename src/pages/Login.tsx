import { Form, Input, Button, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React from "react";

import * as API from "@src/apis";
import {
  json,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import axios from "axios";

export async function loginLoader({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  return json({ data: "test" });
}

export async function loginAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const res = await API.auth.login(submitData);

    notification.success({
      message: "Login Success",
      description: "You have successfully logged in",
    });

    return json({ status: "success", data: res });
  } catch (error) {
    notification.error({
      message: "Login Failed",
      description: "Invalid email or password",
    });

    return json({ status: "error", message: "Invalid email or password" });
  }
}

export const Login = () => {
  const data = useLoaderData();

  console.log({ data });

  const submit = useSubmit();
  const navigation = useNavigation();

  console.log({ navigation });

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    submit(values, { method: "post" });
  };

  const disabledLoginButton =
    navigation.formAction === "/login" && navigation.state === "submitting";

  const disabledRegisterButton =
    navigation.formAction === "/register" && navigation.state === "submitting";

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/content", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigation.state]);

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
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: "500px" }} // Adjust maxWidth to at least the width of the textboxes
      >
        <h1 style={{ textAlign: "left", fontSize: "50px" }}>Sign in</h1>
        <p style={{ textAlign: "left", fontSize: "25px", marginTop: "-40px" }}>
          Stay Organize Login
        </p>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            style={{ width: "500px", height: "50px", fontSize: "16px" }} // Set width to 500px
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            style={{ width: "500px", height: "50px", fontSize: "16px" }} // Set width to 500px
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
            }} // Button width 100% of the form
            loading={disabledLoginButton}
            disabled={disabledLoginButton}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
