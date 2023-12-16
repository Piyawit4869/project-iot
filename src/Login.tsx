import { Button, Card, Col, Form, Image, Input, Row, notification } from "antd";
import * as API from "./apis";
import React from "react";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import LoginImage from "./assets/images/login-graphic.png";
import Clinical from "./assets/images/clinical.png";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export async function LoginAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  try {
    const { data } = await API.auth.login(submitData);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return { message: "Welcome to ChecKal Dashboard", status: "success" };
  } catch (e: any) {
    return { message: "Invalid email or password", status: "error" };
  }
}

export const LoginPage = () => {
  const submit = useSubmit();
  const action = useActionData() as any;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const onSubmit = async (values: any) => {
    submit(values, { method: "post" });
  };

  React.useEffect(() => {
    if (action && action.status) {
      const type = action.status as "success" | "error";

      notification[type]({
        message: action.message,
        placement: "bottomLeft",
        duration: 5,
      });

      if (action.status === "success") {
        navigate("/users");
      }
    }
  }, [action]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row style={styles.background}>
      <Row
        justify="space-around"
        align="middle"
        wrap={false}
        style={styles.row}
      >
        {/* <Image src={LoginImage} preview={false} width="35%"></Image> */}
        <Col xs={0} sm={0} md={10} lg={16}>
          <Image src={LoginImage} preview={false} />
        </Col>
        <Card style={styles.card}>
          <Form
            name="Login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div style={styles.divForm}>
              <Row justify="center" style={{ marginBottom: "25px" }}>
                <Image src={Clinical} preview={false} width="200px" />
              </Row>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                style={styles.input}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="password"
                name="password"
                style={styles.input}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item style={styles.input}>
                <Button
                  type="primary"
                  style={styles.button}
                  htmlType="submit"
                  loading={
                    navigation.state === "loading" ||
                    navigation.state === "submitting"
                  }
                  disabled={
                    navigation.state === "loading" ||
                    navigation.state === "submitting"
                  }
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </Row>
    </Row>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%", // Adjust the width for smaller screens
    maxWidth: "400px", // Set maximum width for the card
    height: "500px",
    backgroundColor: "white",
    borderRadius: "10%",
    margin: "0px 15px",
  },
  logo: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },
  background: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#4B6892",
  },
  row: { width: "100%" },
  divForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  input: { width: "100%" },
  button: { width: "100%" },
};
