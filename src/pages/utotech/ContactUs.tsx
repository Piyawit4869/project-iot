import {
  Typography,
  Row,
  Button,
  Col,
  Card,
  FormInstance,
  Form,
  Input,
  Space,
} from "antd";
import React from "react";

const SubmitButton = ({
  form,
  style,
}: {
  form: FormInstance;
  style: React.CSSProperties;
}) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  const handleButtonClick = async () => {
    if (submittable) {
      // Log the form values
      console.log("Form Values:", values);

      // Perform any additional actions if needed
      // ...

      // Submit the form
      await form.submit();

      // Clear the form values
      form.resetFields();
    }
  };

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onClick={handleButtonClick}
      style={style}
    >
      Contact Us
    </Button>
  );
};

export const ContactUs: React.FC = () => {
  const [form] = Form.useForm();

  const buttonStyle = {
    borderRadius: "0px",
    color: "white",
    transition: "background-color 0.3s ease-in-out", // Optional: Add a smooth transition effect
  };

  const buttonHoverStyle = {
    backgroundColor: "#1890ff",
    // Change to the desired color on hover
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 36,
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "120px" }}
        >
          <div>
            <Typography style={{ fontSize: "36px" }}>
              Let's come to consult!
            </Typography>

            <Typography style={{ fontSize: "20px", color: "grey" }}>
              We're here to help you. Get in touch with us for expert advice and
              assistance.
            </Typography>
          </div>
          <Button style={{ ...buttonStyle, ...buttonHoverStyle }}>
            Let's chat
          </Button>
        </Row>
        <Row
          justify="space-around"
          align="top"
          style={{ marginBottom: "60px" }}
        >
          <Card
            style={{
              backgroundColor: "#106965",
              width: "400px",
              marginBottom: "30px",
            }}
          >
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                marginBottom: "20px",
              }}
            >
              Message Us
            </Typography>

            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Space>
                  <SubmitButton
                    form={form}
                    style={{ ...buttonStyle, ...buttonHoverStyle }}
                  />
                </Space>
              </Form.Item>
            </Form>
          </Card>
          <Col>
            <Card
              style={{
                height: "200px",
                marginBottom: "30px",
              }}
            >
              <Typography
                style={{ fontSize: "18px", fontWeight: "bold", color: "grey" }}
              >
                Contact us
              </Typography>
              <br />
              <Typography style={{ fontSize: "18px" }}>
                +66 080-423-7373
              </Typography>
              <Typography style={{ fontSize: "18px" }}>
                kiattiphoom@utotech.org
              </Typography>
            </Card>

            <Card
              style={{
                height: "200px",
              }}
            >
              <Typography
                style={{ fontSize: "18px", fontWeight: "bold", color: "grey" }}
              >
                Address
              </Typography>
              <br />
              <div style={{ width: "200px" }}>
                <Typography style={{ fontSize: "18px" }}>
                  61/723 Nakhon Chai Si District, Nakhon Pathom 73120
                </Typography>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
