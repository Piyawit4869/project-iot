import { Form, Input, Button, Row, Card } from "antd";
import axios from "axios";

export const LoginPage = () => {
  const onSubmit = (value: any) => {
    const newData = {
      username: value.username,
      password: value.password,
    };
    axios
      .post("http://rhome29.thddns.net:7578/api/login", newData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.token);
          localStorage.setItem("Token", res.data.token);
          window.location.assign("/");
        }

        if (res.status === 203) {
          window.alert(res.data.message);
        }
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Card title="โปรดลงชื่อเข้าใช้">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="ชื่อผู้ใช้"
              name="username"
              rules={[
                {
                  required: true,
                  message: "โปรดกรอกชื่อผู้ใช้",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="รหัสผ่าน"
              name="password"
              rules={[
                {
                  required: true,
                  message: "โปรดกรอกรหัสผ่าน",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                ลงชื่อเข้าใช้
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
};
